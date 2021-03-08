import 'babel-polyfill';
// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)

const StarNotary = artifacts.require('./StarNotary.sol');

let instance; //you can't declare a global var, need to create it for each test case
let accounts; // List of development accounts provided by Truffle
var owner; // Global variable use it in the tests cases

// This called the StartNotary Smart contract and initialize it
contract('StarNotary', async(accs) => {
    accounts = accs; // Assigning test accounts
    owner = accounts[0]; // Assigning the owner test account
    instance = await StarNotary.deployed();
});

// Example test case, it will test if the contract is able to return the starName property 
// initialized in the contract constructor
// it('has correct name', async() => {
//     let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
//     let starName = await instance.starName.call(); // Calling the starName property
//     assert.equal(starName, "Awesome Udacity Star"); // Assert if the starName property was initialized correctly
// });


//this would have been how to do it if you could create an instance as a global variable
it('has correct name', async() => {
    assert.equal(await instance.starName.call(), 'Awesome Udacity Star"');
})

//let write a test to check a transaction 
it('can be claimed'.async() => {
        await instance.claimStar({ from: owner });
        assert.equal(await instance.starOwner.call(), owner),
    })
    // // Example test case, it will test is the Smart Contract function claimStar assigned the Star to the owner address
    // it('can be claimed', async () => {
    //     let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
    //     await instance.claimStar({from: owner}); // Calling the Smart Contract function claimStar
    //     let starOwner = await instance.starOwner.call(); // Getting the owner address
    //     assert.equal(starOwner, owner); // Verifying if the owner address match with owner of the address
    // });

// Example test case, it will test is the Smart Contract function claimStar assigned the Star to the owner address and it can be changed
it('can change owners', async() => {
    var secondUser = accounts[1];
    await instance.claimStar({ from: owner });
    assert.equal(await instance.starOwner.call(), owner);
    await instance.claimStar({ from: secondUser });
    assert.equal(await instance.starOwner.call(), secondUser);
});

//this is how to do the same thing with global instance created
// Example test case, it will test is the Smart Contract function claimStar assigned the Star to the owner address and it can be changed
// it('can change owners', async () => {
//     let instance = await StarNotary.deployed();
//     let secondUser = accounts[1];
//     await instance.claimStar({from: owner});
//     let starOwner = await instance.starOwner.call();
//     assert.equal(starOwner, owner);
//     await instance.claimStar({from: secondUser});
//     let secondOwner = await instance.starOwner.call();
//     assert.equal(secondOwner, secondUser);
//  });