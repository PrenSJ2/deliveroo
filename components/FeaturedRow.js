import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = React.useState([])


    useEffect(() => {
        sanityClient
            .fetch(
                `
            *[_type == "featured" && _id == $id] {
                ...,
               restaurants[]->{
                 ...,
                 dishes[]->,
                 type-> {
                    name
                 }
               },
              }[0]
            `,
                { id }
            )
            .then((data) => {
                setRestaurants(data?.restaurants);
            });
    }, [id]);

    console.log(restaurants)

    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg" >{title}</Text>
                <ArrowRightIcon color="#00CCBB" />
            </View>

            <Text className="text-xs text-gray-500 px-4">{description}</Text>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pt-2"
            >
                {/* Dynamic Featured Cards */}
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        title={restaurant.name}
                        short_description={restaurant.short_description}
                        imgUrl={restaurant.image}
                        address={restaurant.address}
                        long={restaurant.long}
                        lat={restaurant.lat}
                        genre={restaurant.type?.name}
                        rating={restaurant.rating}
                        dishes={restaurant.dishes}
                    />
                ))}

            </ScrollView>

        </View>
    )
}

export default FeaturedRow