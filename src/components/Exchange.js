import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack } from '@chakra-ui/react'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import ErrorComp from './ErrorComp'
const Exchange = () => {
    const [exchange, setExchange] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`)
                setExchange(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchExchanges()
    }, [])

    if (error) return <ErrorComp msg={"Something went wrong"} />

    return (
        <Container maxW={"container.xl"}>
            {loading ? (<Loader />) :
                (<>
                    <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
                        {
                            exchange.map((ele) =>
                                (<ExchangeCard key={ele.id} name={ele.name} rank={ele.trust_score_rank} url={ele.url} img={ele.image} />)
                            )
                        }
                    </HStack>
                </>)
            }
        </Container>
    )
}

export default Exchange