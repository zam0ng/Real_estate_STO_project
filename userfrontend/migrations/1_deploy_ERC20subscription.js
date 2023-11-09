    // owner주소, 이름, symbol , 총공급량, 구매자주소[],분배량[],락업시간,documenturi
    // document는 선택적으로 할 수 있으면 좋겠다.

const ERC20subscription = artifacts.require("ERC20subscription");

module.exports = function(deployer) {
  deployer.deploy(ERC20subscription,
    '0x47e288393dcFb266621D641AA38f548A3c87bECb',
    'truffletest',
    'tft',
    '100',
    ['0x47e288393dcFb266621D641AA38f548A3c87bECb',
    '0xB01A340E9c4Da2CE3f64E2c0D0a3aEEb4A7808cd'],
    ['20','80'],
    '180',
    'https://tomato-peculiar-clownfish-972.mypinata.cloud/ipfs/QmSAdbek1DDb91BM8no29LeRxapusH72pmMZWs8zokGt6p?_gl=1*159wfdr*_ga*MTk4MTc0Nzc1NS4xNjk5MzM1ODAw*_ga_5RMPXG14TE*MTY5OTUxNDA0NC40LjEuMTY5OTUxNDA0Ny41Ny4wLjA.'
    );
}; 