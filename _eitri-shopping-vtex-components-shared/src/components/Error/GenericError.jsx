import Eitri from "eitri-bifrost";
import ErrorImage from '../../assets/images/error_eitri.svg';
import { Text, View, Touchable, Image } from "eitri-luminus";

export default function GenericError(props) {
    const {
        title,
        bodyText,
        retryButtonLabel,
        onRetryPress = null
    } = props

    function goBack(){
        Eitri.navigation.back()
    }

    return (
        <View
            direction='column'
            alignItems='center'
            height="85vh"
        >
            <View
                direction='column'
                justifyContent='center'
                alignItems='center'
                paddingHorizontal='nano'
                height= '100%'>
                <Image
                    src={ErrorImage}
                    width='100%'
                />
                <View
                    direction='column'
                    gap={8}
                    justifyContent='center'
                    paddingHorizontal='nano'
                >
                    <Text
                        fontWeight='bold'
                        color='primary-base'
                        fontSize='medium'>
                        {title || "Erro inesperado"}
                    </Text>
                    <Text
                        color='neutral-light'
                        fontSize='body-small'>
                        {bodyText || "Ops, ocorreu um erro inesperado. Tente novamente ou retorne mais tarde."}
                    </Text>
                </View>
            </View>
            <View
                width='100%'
                position='absolute'
                bottom='8%'
                display='flex'
                justifyContent='evenly'
                alignItems='center'
            >
                <Touchable
                    borderRadius="small"
                    width="40%"
                    onPress={goBack}
                    customColor="#FFF"
                    padding="extra-small"
                    justifyContent="center"
                    borderColor="#000"
                    borderWidth="hairline"
                >
                    <Text textAlign='center' color="title"  fontWeight="bold">Voltar</Text>
                </Touchable>
                <Touchable
                    borderRadius="small"
                    width="40%"
                    onPress={onRetryPress}
                    customColor="#212121"
                    padding="extra-small"
                    justifyContent="center"
                >
                    <Text textAlign='center' color="neutral-100">{retryButtonLabel || "Tentar novamente"}</Text>
                </Touchable>
            </View>
        </View>

    )
}