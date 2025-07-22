'use client'

import { Grid, GridItem } from '@chakra-ui/react'

const CardTheme = ({ item }) => {
    return (
        <div
            style={{ 
                height: "180px",
                width: "180px"
            }}
        >
            <Grid
                w={"100%"}
                h={"100%"}
                templateColumns='repeat(2, 1fr)' 
                gap={2}
                background={ "gray.200" }
                borderRadius={"8px"}
                padding={"4px"}
            >
                <GridItem w='100%' h='32px' display={"flex"} alignItems={"center"}>{`[商品名稱]`}</GridItem>
                <GridItem w='100%' h='32px' display={"flex"} alignItems={"center"}>{item.name}</GridItem>
                <GridItem w='100%' h='32px' display={"flex"} alignItems={"center"}>{`[類別]`}</GridItem>
                <GridItem w='100%' h='32px' display={"flex"} alignItems={"center"}>{item.category}</GridItem>
                <GridItem w='100%' h='32px' display={"flex"} alignItems={"center"}>{`[價格]`}</GridItem>
                <GridItem w='100%' h='32px' display={"flex"} alignItems={"center"}>{`$${item.price}`}</GridItem>
                <GridItem w='100%' h='32px' display={"flex"} alignItems={"center"}>{`[庫存]`}</GridItem>
                <GridItem w='100%' h='32px' display={"flex"} alignItems={"center"}>{item.inStock ? "有庫存" : "無" }</GridItem>
            </Grid>
        </div>
    )
}

export default CardTheme;