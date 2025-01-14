import { Spacing, Divisor } from 'eitri-shopping-demo-shared'
import { useTranslation } from 'eitri-i18n'

export default function Supplier(props) {

    const { supplier } = props;

    const [collapsed, setCollapsed] = useState(true)

    const { t } = useTranslation()

    const toggleCollapsedState = () => {
        setCollapsed(!collapsed)
    }

    return (
        <View>
            <Touchable onPress={() => toggleCollapsedState()}>
                <View display='flex' alignItems='center' justifyContent='between' width='100%'>
                    <Text fontSize='large' fontWeight='bold'>{t('supplier.txtSupplier')}</Text>
                    <Icon iconKey={collapsed ? 'chevron-down' : 'chevron-up'} width={26} />
                </View>
            </Touchable>
            {!collapsed &&
                <View>
                    <Text>{supplier}</Text>
                    <Spacing height='20px' />
                </View>
            }
            <Divisor />
        </View>
    )
}
