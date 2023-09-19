import React, { useState, useEffect } from 'react'
import { Container, Box, RadioGroup, Radio, HStack, VStack, Text, Image, StatLabel, Stat, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'
import { server } from '../index'
import ErrorComp from './ErrorComp'
import Chart from './Chart'


const CoinDetails = () => {
    const [coin, setCoins] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [currency, setCurrency] = useState("inr")
    const [days, setDays] = useState("24h")
    const [chartarray, setChartarray] = useState([])

    const params = useParams()

    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"]


    const switchStat = (key) => {
        switch (key) {
            case "24h":
                setDays("24h")
                setLoading(true)
                break;
            case "7d":
                setDays("7d")
                setLoading(true)
                break;
            case "14d":
                setDays("14d")
                setLoading(true)
                break;
            case "30d":
                setDays("30d")
                setLoading(true)
                break;
            case "60d":
                setDays("60d")
                setLoading(true)
                break;
            case "200d":
                setDays("200d")
                setLoading(true)
                break;
            case "365d":
                setDays("365d")
                setLoading(true)
                break;
            case "max":
                setDays("max")
                setLoading(true)
                break;

            default:
                setDays("24h")
                setLoading(true)
                break;
        }
    }

    useEffect(() => {
        const fetchCoinDetail = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`)
                const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
                setCoins(data);
                setChartarray(chartData.prices)
                setLoading(false)
                console.log(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchCoinDetail()
    }, [params.id, currency, days])

    if (error) return <ErrorComp msg={"Something went wrong"} />

    return (
        <Container maxW={"container.xl"}>
            {
                loading ? <Loader /> : (
                    <>
                        <Box w={"full"} borderWidth={1}>
                            <Chart arr={chartarray} currency={currencySymbol} days={days} />
                        </Box>


                        <HStack p={"4"} overflowX={"auto"}>
                            {
                                btns.map((ele) => {
                                    return <Button key={ele} onClick={() => switchStat(ele)}>{ele}</Button>
                                })
                            }
                        </HStack>



                        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                            <HStack spacing={"4"}>
                                <Radio value={'inr'}>INR</Radio>
                                <Radio value={'usd'}>USD</Radio>
                                <Radio value={'eur'}>EUR</Radio>
                            </HStack>
                        </RadioGroup>

                        <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
                            <Text fontSize={"Small"} alignSelf="center" opacity={0.7}>
                                Last updated on
                                {Date(coin.market_data.last_updated).split("G")[0]}
                            </Text>

                            <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />

                            <Stat>
                                <StatLabel>{coin.name}</StatLabel>
                                <StatNumber>
                                    {currencySymbol}{coin.market_data.current_price[currency]}
                                </StatNumber>
                                <StatHelpText>
                                    <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "decrease" : "increase"} />
                                    {coin.market_data.price_change_percentage_24h}%
                                </StatHelpText>
                            </Stat>

                            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
                                {`#${coin.market_cap_rank}`}
                            </Badge>

                            <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                            />

                            <Box w={"full"} p={"4"}>
                                <Item title={"Max supply"} value={coin.market_data.max_supply}
                                />

                                <Item title={"Circulating supply"} value={coin.market_data.circulating_supply}
                                />

                                <Item title={"Market cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                                />

                                <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                                />
                                <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                                />
                            </Box>
                        </VStack>
                    </>
                )
            }
        </Container>
    )
}

function CustomBar({ high, low }) {
    return (
        <VStack w={"full"}>
            <Progress value={50} colorScheme={"teal"} w={"full"} />
            <HStack justifyContent={'space-between'} w={'full'}>
                <Badge children={low} colorScheme={"red"} />
                <Text fontSize={"sm"}>
                    24H Range
                </Text>
                <Badge children={high} colorScheme={"green"} />
            </HStack>
        </VStack>
    )
}


function Item({ title, value }) {
    return (
        <HStack justifyContent={"space-between"} my={"4"} w={"full"}>
            <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
            <Text>{value}</Text>
        </HStack>
    )
}

export default CoinDetails