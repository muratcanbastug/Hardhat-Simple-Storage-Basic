const { ethers, run, network } = require('hardhat');

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    // === 4 is rinkeby. verify hardhat gibi local blockchainlerde çalışmaz. Etherscan üzerinde çalışır.
    // Bu yüzden verify yapacağımız zaman hangi chain'de olduğumuzu kontrol etmemiz gerekir.
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait();
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err) {
    if (err.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!');
    } else {
      console.log(err);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
