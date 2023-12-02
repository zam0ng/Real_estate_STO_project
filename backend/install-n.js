// n 라이브러리 리눅스에서만 실행되게 하는 테스트 by DJ ✅ 
    // install-n.js
const { execSync } = require('child_process');
const os = require('os');

// Linux와 macOS에서만 실행
if (os.platform() === 'linux' || os.platform() === 'darwin') {
  console.log('Installing n...');
  execSync('npm install n');
}

console.log('Current platform:', os.platform())
