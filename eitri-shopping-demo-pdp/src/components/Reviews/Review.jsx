import { Divisor } from 'eitri-shopping-demo-shared'
import Rating from '../Rating/Rating';
import { useTranslation } from 'eitri-i18n'

export default function Review(props) {

    const { review } = props;

    const { t } = useTranslation()
    
    return (
        <View>
            <View paddingVertical='small'>
                <Text fontSize='medium' fontWeight='bold'>{review?.user?.name}</Text>
                <View display='flex' alignItems='center' justifyContent='between' paddingTop='nano'>
                    <Rating ratingValue={review?.rate} />
                    <Text color='neutral-500' fontWeight='bold'>{review?.created_at}</Text>
                </View>
                <View paddingVertical='nano'>
                    <Text>{review?.opinion || t('review.txtOpnion')}</Text>
                </View>
            </View>
            <Divisor />
        </View>
    )
}
