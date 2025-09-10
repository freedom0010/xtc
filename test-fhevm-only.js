// 简化的FHEVM测试脚本
console.log('🧪 开始测试FHEVM功能...\n');

// 测试FHEVM模拟功能
console.log('📊 测试FHEVM加密功能:');

try {
  // 模拟FHEVM加密
  function mockEncryptGlucose(value) {
    const glucose = parseFloat(value);
    if (glucose < 20 || glucose > 600) {
      throw new Error('血糖值必须在 20-600 mg/dL 范围内');
    }

    // 生成模拟的加密数据
    const mockData = new Uint8Array(32);
    const valueBytes = new TextEncoder().encode(value.toString());
    mockData.set(valueBytes.slice(0, Math.min(valueBytes.length, 32)));
    
    return {
      data: '0x' + Array.from(mockData).map(b => b.toString(16).padStart(2, '0')).join(''),
      proof: '0x' + '00'.repeat(64), // 模拟证明
      isSimulated: true
    };
  }

  const testGlucoseValue = 120;
  console.log('原始血糖值:', testGlucoseValue, 'mg/dL');
  
  const encryptedData = mockEncryptGlucose(testGlucoseValue);
  console.log('✅ FHEVM加密成功 (模拟模式)');
  console.log('加密数据:', encryptedData.data.substring(0, 20) + '...');
  console.log('证明数据:', encryptedData.proof.substring(0, 20) + '...');
  console.log('是否为模拟:', encryptedData.isSimulated);

} catch (error) {
  console.log('❌ FHEVM测试失败:', error.message);
}

console.log('\n📁 测试IPFS上传功能:');

try {
  // 模拟IPFS上传
  function mockUploadToIPFS(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 生成模拟的 CID
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 15);
        const mockCid = `Qm${timestamp}${random}`.substring(0, 46);
        
        console.log('🔄 模拟上传到 IPFS:', mockCid);
        resolve(mockCid);
      }, 1000);
    });
  }

  const testData = {
    patientId: 'test-patient-001',
    encryptedData: '0x1234567890abcdef...',
    timestamp: Date.now(),
    dataType: 'blood-sugar'
  };
  
  console.log('上传数据:', testData);
  
  mockUploadToIPFS(testData).then(ipfsHash => {
    console.log('✅ IPFS上传成功 (模拟模式)');
    console.log('IPFS哈希:', ipfsHash);
    
    console.log('\n🎉 测试完成！');
    console.log('\n📝 注意事项:');
    console.log('- 当前运行在模拟模式下');
    console.log('- FHEVM需要连接到Sepolia测试网或本地FHEVM节点');
    console.log('- IPFS需要运行本地节点或使用公共网关');
    console.log('- 在生产环境中，请确保正确配置这些服务');
  });

} catch (error) {
  console.log('❌ IPFS测试失败:', error.message);
}