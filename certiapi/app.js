import {createClient,http} from 'viem'
import {hardhat} from 'viem/chains'
import {privateKeyToAccount} from 'viem/accounts'

const client = createClient({
    chain:hardhat,
    account:privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'),
    transport:http()
})

export default client