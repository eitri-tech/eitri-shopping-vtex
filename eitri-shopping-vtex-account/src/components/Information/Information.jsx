export default function Information(props) {
    const { showInfo, rewards, objectives, points, handleShare, openModal } = props

    // TODO - precisa internacionalizar?

    const availablePoints = (pointsNeeded) => {
        return points?.Item?.PointsBalance >= pointsNeeded
    }

    return (
        <View padding='small'>
                {showInfo === 'rewards' && rewards?.Item?.map((item, index) => (
                    item.Enabled && (
                        <View key={index} display='flex' direction='row' padding='small' borderWidth='hairline' borderColor='neutral-300' borderRadius='small' marginBottom='small' justifyContent='between' alignItems='center'>
                            <View display='flex' direction='column'>
                                {item.Title != "Frete Grátis" && <Text>Cupom de:</Text>}
                                <Text fontWeight='bold' fontSize='medium'>{item.Title}</Text>
                                <Text fontSize='medium'>{`por ${item.Points} pontos`}</Text>
                            </View>
                            <Touchable onPress={() => openModal(item)}>
                                <View display='flex' borderWidth='hairline' borderColor={availablePoints(item.Points) ? 'primary-700' : 'neutral-500'} borderRadius='small' width='100px' height='40px' alignItems='center' justifyContent='center'>
                                    <Text color={availablePoints(item.Points) ? 'primary-700' : 'neutral-500'}>Resgatar</Text>
                                </View>
                            </Touchable>
                        </View>
                    )
                ))}
                {showInfo === 'objectives' && objectives?.Item?.map((item, index) => (
                    item.IsCompleted === false && (
                        (item.Type === 4 && item.ReferralUrl) ?
                            <View key={index} display='flex' direction='row' padding='small' borderWidth='hairline' borderColor='neutral-300' borderRadius='small' marginBottom='small'>
                                <Text fontWeight='bold' fontSize='medium'>{item.Title}</Text>
                                <Touchable onPress={() => handleShare(item.WhatsAppShareText)}>
                                    <View display='flex' borderWidth='hairline' borderColor='primary-700' borderRadius='small' width='100px' height='40px' alignItems='center' justifyContent='center'>
                                        <Text color='primary-700'>Indicar</Text>
                                    </View>
                                </Touchable>
                            </View>
                            :
                            <View key={index} display='flex' direction='column' padding='small' borderWidth='hairline' borderColor='neutral-300' borderRadius='small' marginBottom='small'>
                                <Text fontWeight='bold' fontSize='medium'>{item.Title}</Text>
                                <Text fontSize='small'>{item.Description}</Text>
                            </View>
                    )
                ))}
            </View>
    )
}
