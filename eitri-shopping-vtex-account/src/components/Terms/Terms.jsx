import { getTerms } from '../../services/BonifiqService/BonifiqService'
import { Loading } from 'eitri-shopping-vtex-components-shared'


export default function Terms(props) {
    const { publicId } = props

    const [terms, setTerms] = useState('')
    const [collapsed, setCollapsed] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const toggleCollapsedState = async () => {
        if (!terms) {
            await handleTerms()
        }
        setCollapsed(!collapsed)
    }

    const handleTerms = async () => {
        setIsLoading(true)
        let response = await getTerms(publicId)
        setTerms(response)
        setIsLoading(false)
    }

    return (
        <View paddingHorizontal='small'>
            <Touchable onPress={() => toggleCollapsedState()}>
                <View display='flex' alignItems='center' justifyContent='between' width='100%'>
                    <Text fontSize='large' fontWeight='bold'>Termos</Text>
                    <Icon iconKey={collapsed ? 'chevron-down' : 'chevron-up'} width={26} />
                </View>
            </Touchable>
            {!collapsed &&
                (isLoading && !terms ?
                    <Loading />
                    :
                    <Text>{terms.Item.Terms}</Text>)
            }
        </View>
    )
}
