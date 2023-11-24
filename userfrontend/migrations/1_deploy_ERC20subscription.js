    // owner주소, 이름, symbol , 총공급량, 구매자주소[],분배량[],락업시간,documenturi
    // document는 선택적으로 할 수 있으면 좋겠다.

const ERC20subscription = artifacts.require("ERC20subscription");

module.exports = function(deployer) {

  const deployed = deployer.deploy(ERC20subscription,
    '0x0059b1F421D6a05a3bF75851d4fA3449e46c3ae3',
    'truffletest',
    'tft',
    '100',
    ['0x3ddFc6b811BEB7d2085f6B11AF10AeE4A20c22dd',
    '0xdEf0882ac5760f46f63484704b42dC900d9377e8'],
    ['20','80'],
    '180',
    'https://tomato-peculiar-clownfish-972.mypinata.cloud/ipfs/QmSAdbek1DDb91BM8no29LeRxapusH72pmMZWs8zokGt6p?_gl=1*159wfdr*_ga*MTk4MTc0Nzc1NS4xNjk5MzM1ODAw*_ga_5RMPXG14TE*MTY5OTUxNDA0NC40LjEuMTY5OTUxNDA0Ny41Ny4wLjA.'
    );

    console.log(deployed)
}; 