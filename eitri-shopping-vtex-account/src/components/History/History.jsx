import { getHistory } from '../../services/BonifiqService/BonifiqService'
import formatDate from '../../utils/Date'
import { Loading } from 'eitri-shopping-vtex-components-shared'

export default function History(props) {
    const { publicId } = props

    const [history, setHistory] = useState('')
    const [collapsed, setCollapsed] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const toggleCollapsedState = async () => {
        if (!history) {
            await handleHistory()
        }
        setCollapsed(!collapsed)
    }

    const handleHistory = async () => {
        let response = await getHistory(publicId)
        setHistory(response)
        setIsLoading(false)
    }

    return (
        <View paddingHorizontal='small'>
            <Touchable onPress={() => toggleCollapsedState()}>
                <View display='flex' alignItems='center' justifyContent='between' width='100%'>
                    <Text fontSize='large' fontWeight='bold'>Histórico</Text>
                    <Icon iconKey={collapsed ? 'chevron-down' : 'chevron-up'} width={26} />
                </View>
            </Touchable>
            {!collapsed &&
                (isLoading && !history ?
                    <Loading />
                    :
                    (
                        history?.Item.Items.map((item, index) => (
                            <View key={index} display='flex' width='100%' justifyContent='between' paddingVertical='small'>
                                <View display='flex' direction='column'>
                                    <Text fontSize='small'>{item.Title}</Text>
                                    <Text fontWeight='bold' fontSize='medium'>{`${item.Points} Pontos`}</Text>
                                </View>
                                <View>
                                    <Text fontSize='small'>{formatDate(item.Date)}</Text>
                                </View>
                            </View>
                        ))
                    )
                )


            }
        </View>
    )
}
