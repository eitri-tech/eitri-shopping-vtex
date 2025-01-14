export default function Quantity(props) {

    const { quantity, handleItemQuantity, disable } = props

    return (
        <View display='flex' borderWidth='hairline' borderColor="neutral-300" borderRadius="pill" width='50%' height='35px' justifyContent='between' alignItems='center' paddingLeft="nano">
            <View width='33%' alignItems='center' justifyContent='center'>
                {quantity === 1 || disable ?
                    <Icon iconKey="minus" width={16} height={16} color={'neutral-300'} />
                    :
                    <Touchable onPress={() => handleItemQuantity(-1)}>
                        <Icon iconKey="minus" width={16} color={'primary-700'} />
                    </Touchable>
                }
            </View>
            <View width='33%' alignItems='center' justifyContent='center' paddingLeft="nano">
                <Text fontWeight='bold'>{quantity}</Text>
            </View>
            <View width='33%' alignItems='center' justifyContent='center' paddingLeft="nano">
                {disable ?
                    <Icon iconKey="plus" width={16} height={16} color={'neutral-300'} />
                    :
                    <Touchable onPress={() => handleItemQuantity(1)}>
                        <Icon iconKey="plus" width={16} height={16} color={'primary-700'} />
                    </Touchable>
                }
            </View>
        </View>
    )
}
