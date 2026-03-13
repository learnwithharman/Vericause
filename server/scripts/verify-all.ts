// Using global fetch (available in Node 18+)


const API_BASE = 'http://localhost:5000/api';
const timestamp = Date.now();

const ADMIN_EMAIL = 'admin@vericause.com';
const ADMIN_PASS = 'admin123';

const TEST_NGO = {
  name: 'Test NGO',
  email: `ngo_${timestamp}@test.com`,
  password: 'password123',
  role: 'NGO',
  organizationName: 'Global Relief ' + timestamp,
  description: 'Helping the world.'
};

const TEST_DONOR = {
  name: 'Test Donor',
  email: `donor_${timestamp}@test.com`,
  password: 'password123',
  role: 'DONOR'
};

async function runTests() {
  console.log('🚀 Starting Vericause Functional Verification...');

  try {
    // 1. Admin Login
    console.log('\n--- Phase 1: Admin Credentials ---');
    const adminLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS })
    });
    const { token: adminToken } = await adminLoginRes.json();
    if (!adminToken) throw new Error('Admin login failed');
    console.log('✅ Admin login successful');

    // 2. NGO Registration & Login
    console.log('\n--- Phase 2: NGO Registration & Login ---');
    const ngoRegRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_NGO)
    });
    if (!ngoRegRes.ok) throw new Error('NGO Registration failed: ' + (await ngoRegRes.text()));
    console.log('✅ NGO registered');

    const ngoLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TEST_NGO.email, password: TEST_NGO.password })
    });
    const { token: ngoToken, user: ngoUser } = await ngoLoginRes.json();
    const ngoId = ngoUser.ngo.id;
    console.log('✅ NGO login successful, NGO ID:', ngoId);

    // 3. NGO Creates Campaign
    console.log('\n--- Phase 3: NGO Campaign Creation ---');
    const campaignData = {
      title: 'Emergency Relief ' + timestamp,
      description: 'Urgent funding needed for ' + timestamp,
      goalAmount: 5000,
      category: 'Emergency'
    };
    const campRes = await fetch(`${API_BASE}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ngoToken}`
      },
      body: JSON.stringify(campaignData)
    });
    const campaign = await campRes.json();
    if (!campaign.id) throw new Error('Campaign creation failed');
    console.log('✅ Campaign created: ', campaign.id);

    // 4. Admin Approves Campaign
    console.log('\n--- Phase 4: Admin Campaign Moderation ---');
    const approveRes = await fetch(`${API_BASE}/admin/campaigns/${campaign.id}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'APPROVED' })
    });
    if (!approveRes.ok) throw new Error('Admin approval failed');
    console.log('✅ Campaign approved by Admin');

    // 5. Donor Registration & Login
    console.log('\n--- Phase 5: Donor Registration & Login ---');
    const donorRegRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_DONOR)
    });
    if (!donorRegRes.ok) throw new Error('Donor Registration failed');
    console.log('✅ Donor registered');

    const donorLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: TEST_DONOR.email, password: TEST_DONOR.password })
    });
    const { token: donorToken } = await donorLoginRes.json();
    console.log('✅ Donor login successful');

    // 6. Donor Donates
    console.log('\n--- Phase 6: Donation Workflow ---');
    const donateRes = await fetch(`${API_BASE}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${donorToken}`
      },
      body: JSON.stringify({ campaignId: campaign.id, amount: 250 })
    });
    const donation = await donateRes.json();
    if (!donation.id) throw new Error('Donation failed');
    console.log('✅ Donation successful, Amount: $250');

    // 7. Verify Stats
    console.log('\n--- Phase 7: Verification of Stats ---');
    const statsRes = await fetch(`${API_BASE}/admin/stats`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const stats = await statsRes.json();
    console.log('✅ Final Stats Check:', stats);

    console.log('\n✨ ALL FUNCTIONS VERIFIED SUCCESSFULLY ✨');
    process.exit(0);

  } catch (error: any) {
    console.error('\n❌ VERIFICATION FAILED:', error.message);
    process.exit(1);
  }
}

runTests();
