// owner주소, 이름, symbol , 총공급량, 구매자주소[],분배량[],락업시간,documenturi
// document는 선택적으로 할 수 있으면 좋겠다.

const ERC20subscription = artifacts.require("ERC20subscription");

module.exports = function (deployer) {
  deployer.deploy(
    ERC20subscription,
    "0xFeB2F0F4537bc7CE81A7244520b238950fC846f2",
    "truffletest",
    "tft",
    "100",
    [
      "0x5666e742D1016c719C9B581f23EADb1150f7C5e0",
      "0x021085e42baB6D7574D2383f75FD2E87108F19fd",
    ],
    ["20", "80"],
    "180",
    "https://tomato-peculiar-clownfish-972.mypinata.cloud/ipfs/QmSAdbek1DDb91BM8no29LeRxapusH72pmMZWs8zokGt6p?_gl=1*159wfdr*_ga*MTk4MTc0Nzc1NS4xNjk5MzM1ODAw*_ga_5RMPXG14TE*MTY5OTUxNDA0NC40LjEuMTY5OTUxNDA0Ny41Ny4wLjA."
  );
};
