// 测试FHEVM和IPFS服务的脚本
const { FHEVMClient } = require('./utils/fhevm.js');
const { IPFSClient } = require('./utils/ipfs.js');

async function testServices() {
  console.log('🧪 开始测试FHEVM和IPFS服务...\n');

  // 测试FHEVM
  console.log('📊 测试FHEVM加密功能:');
  try {
    const fhevmClient = new FHEVMClient();
    await fhevmClient.init();
    
    const testData = {
      bloodSugar: 120,
      timestamp: Date.now(),
      patientId: 'test-patient-001'
    };
    
    console.log('原始数据:', testData);
    const encryptedData = await fhevmClient.encryptBloodSugar(testData.bloodSugar);
    console.log('✅ FHEVM加密成功');
    console.log('加密数据长度:', encryptedData.length);
    
  } catch (error) {
    console.log('❌ FHEVM测试失败:', error.message);
    console.log('💡 这可能是因为没有连接到FHEVM网络，使用模拟模式');
  }

  console.log('\n📁 测试IPFS上传功能:');
  try {
    const ipfsClient = new IPFSClient();
    await ipfsClient.init();
    
    const testData = {
      patientId: 'test-patient-001',
      encryptedData: 'mock-encrypted-data',
      timestamp: Date.now(),
      dataType: 'blood-sugar'
    };
    
    console.log('上传数据:', testData);
    const ipfsHash = await ipfsClient.uploadData(testData);
    console.log('✅ IPFS上传成功');
    console.log('IPFS哈希:', ipfsHash);
    
    // 测试检索
    const retrievedData = await ipfsClient.retrieveData(ipfsHash);
    console.log('✅ IPFS检索成功');
    console.log('检索数据:', retrievedData);
    
  } catch (error) {
    console.log('❌ IPFS测试失败:', error.message);
    console.log('💡 这可能是因为没有运行IPFS节点，使用模拟模式');
  }

  console.log('\n🎉 测试完成！');
  console.log('\n📝 注意事项:');
  console.log('- FHEVM需要连接到Sepolia测试网或本地FHEVM节点');
  console.log('- IPFS需要运行本地节点或使用公共网关');
  console.log('- 在生产环境中，请确保正确配置这些服务');
}

// 运行测试
testServices().catch(console.error);