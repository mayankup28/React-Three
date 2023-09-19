import React from 'react'
import {Avatar, Box, Stack, VStack,Text} from "@chakra-ui/react"

const Footer = () => {
    return (
        <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"} minH={"48"} px={"16"} py={["16","8"]}>
            <Stack direction={["column","row"]} h={"full"} alignItems={"center"}>
                <VStack w={"full"} alignItems={["center","flex-start"]}>
<Text fontWeight={"bold"}>About Us</Text>
<Text w={"80"} fontSize={"sm"} letterSpacing={"widest"} textAlign={['center','left']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque reiciendis magnam aut maiores totam earum aperiam eum necessitatibus perspiciatis placeat.</Text>
                </VStack>

                <VStack>
                    <Avatar boxSize={"28"} mt={["4","0"]}/>
                    <Text>Our Founder</Text>
                </VStack>
            </Stack>
        </Box>
    )
}

export default Footer