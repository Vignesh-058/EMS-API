const http = require('http');

const BASE = 'http://localhost:5000/api/v1/employees';

const get = (url) => new Promise((resolve, reject) => {
  const req = http.get(url, (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
  });
  req.on('error', reject);
});

const check = (label, r) => {
  const ok = r.status === 200 && r.data.success;
  const p = r.data.pagination;
  const rowCount = Array.isArray(r.data.data) ? r.data.data.length : '?';
  console.log(`${ok ? '✅' : '❌'} ${label}`);
  if (p) {
    console.log(`   page=${p.currentPage}/${p.totalPages}  total=${p.totalEmployees}  rows=${rowCount}  next=${p.hasNextPage}  prev=${p.hasPreviousPage}`);
  }
  if (!ok) console.log('   RESPONSE:', JSON.stringify(r.data).substring(0, 200));
};

(async () => {
  try {
    const r1 = await get(`${BASE}?page=1&limit=5`);
    check('GET ?page=1&limit=5', r1);

    const r2 = await get(`${BASE}?page=2&limit=3`);
    check('GET ?page=2&limit=3', r2);

    const r3 = await get(`${BASE}?search=bob`);
    check('GET ?search=bob', r3);

    const r4 = await get(`${BASE}?search=Eng`);
    check('GET ?search=Eng (department field)', r4);

    const r5 = await get(`${BASE}?department=Engineering`);
    check('GET ?department=Engineering', r5);

    const r6 = await get(`${BASE}?status=Active`);
    check('GET ?status=Active', r6);

    const r7 = await get(`${BASE}?gender=Female`);
    check('GET ?gender=Female', r7);

    const r8 = await get(`${BASE}?salaryMin=80000&salaryMax=120000`);
    check('GET ?salaryMin=80000&salaryMax=120000', r8);

    const r9 = await get(`${BASE}?sortBy=salary&sortOrder=asc&limit=5`);
    check('GET ?sortBy=salary&sortOrder=asc&limit=5', r9);
    if (r9.data.data?.length > 1) {
      const salaries = r9.data.data.map(e => e.salary);
      const sorted = [...salaries].sort((a,b)=>a-b);
      console.log(`   Salary order correct: ${JSON.stringify(salaries) === JSON.stringify(sorted)}`);
    }

    const r10 = await get(`${BASE}?sortBy=firstName&sortOrder=asc&limit=5`);
    check('GET ?sortBy=firstName&sortOrder=asc', r10);

    const r11 = await get(`${BASE}?fields=firstName,lastName,email,department&limit=3`);
    check('GET ?fields=firstName,lastName,email,department', r11);
    if (r11.data.data?.length) {
      const keys = Object.keys(r11.data.data[0]);
      console.log(`   Returned fields: ${keys.join(', ')}`);
    }

    const r12 = await get(`${BASE}?search=bob&department=Marketing&page=1&limit=10&sortBy=salary&sortOrder=desc`);
    check('GET combined: search+department+page+sort', r12);

    console.log('\n✅ All tests complete.');
  } catch (err) {
    console.error('❌ Test runner error:', err.message);
  }
})();
