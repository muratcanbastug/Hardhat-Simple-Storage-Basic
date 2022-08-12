const { ethers } = require('hardhat');
const { expert, assert } = require('chai');

describe('SimpleStorage', () => {
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it('Should start with a favorite number of 0', async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue.toString()).to.equal(expectedValue);
  });

  it('Should update when we call store', async () => {
    const expectedValue = '7';
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait();

    const updatedValue = await simpleStorage.retrieve();
    assert.equal(updatedValue, expectedValue);
  });

  it('Should store person when we call addPerson', async () => {
    const expectedValue = '2';
    const transactionResponse = await simpleStorage.addPerson(
      'Murat',
      expectedValue
    );
    await transactionResponse.wait();

    const updatedValue = await simpleStorage.getPerson('Murat');
    assert.equal(updatedValue, expectedValue);
  });
});
