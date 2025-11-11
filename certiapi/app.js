import {createClient,http} from 'viem'
import {hardhat,hoodi} from 'viem/chains'
import {privateKeyToAccount} from 'viem/accounts'
import dotenv from 'dotenv'
dotenv.config()

const client = createClient({
    chain:hoodi,
    account:privateKeyToAccount(process.env.PRIVATE_KEY),
    transport:http()
})

export default client