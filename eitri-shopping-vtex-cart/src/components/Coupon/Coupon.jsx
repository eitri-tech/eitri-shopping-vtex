import Eitri from 'eitri-bifrost'
import { Spacing, Loading, CustomInput, CustomButton } from 'eitri-shopping-vtex-components-shared'
import { useTranslation } from 'eitri-i18n'
import {useLocalShoppingCart} from "../../providers/LocalCart";
import {addCoupon, removeCoupon} from "../../services/cartService";

export default function Coupon(props) {

  const { cart } = useLocalShoppingCart()

  const [coupon, setCoupon] = useState('')
	const [appliedCoupon, setAppliedCoupon] = useState('')
	const [invalidCoupon, setInvalidCoupon] = useState(false)
	const [couponTextAlert, setCouponTextAlert] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { t } = useTranslation()

	useEffect(() => {
		if (cart?.marketingData?.coupon) {
			setInvalidCoupon(false);
			setAppliedCoupon(cart.marketingData.coupon);

			if (coupon === cart?.marketingData?.coupon) {
				setCouponTextAlert(t('coupon.txtAppliedCoupon'));
			}
		} else {
			const errorMessage = cart?.messages || [];
			const couponError = coupon && errorMessage.find(message => message.text.includes(coupon));

			if (couponError) {
				if (couponError.code === 'couponNotFound') {
					setCouponTextAlert(t('coupon.txtInvalidCoupon'));
				} else if (couponError.code === 'couponExpired') {
					setCouponTextAlert(t('coupon.txtExpiredCoupon'));
				}
				setInvalidCoupon(true);
			} else {
				setInvalidCoupon(false);
				setAppliedCoupon('');
			}
		}
	}, [cart]);

	const inputOnChange = value => {
		setCoupon(value)
	}

	const onPressAddCoupon = () => {
		setIsLoading(true)
		addCoupon(coupon)
		setIsLoading(false)
	}

	const onPressRemoveCoupon = () => {
		setCoupon('')
		setCouponTextAlert('')
		removeCoupon()
	}

  if (!cart) return null

  return (
		<View
			paddingHorizontal='medium'>
			<Text
				fontSize='medium'
				fontWeight='bold'>
				{t('coupon.txtCoupon')}
			</Text>
			<View
				marginTop='extra-small'
				display='flex'
				gap={8}
				justifyContent='between'
				alignItems='center'>
				{appliedCoupon ? (
					<>
						<View
							display='flex'
							marginVertical='small'
							paddingVertical='medium'
							paddingHorizontal='small'
							borderWidth='hairline'
							borderColor='neutral-300'
							borderRadius='small'
							width='90%'>
							<Text>{appliedCoupon}</Text>
						</View>
						<Touchable onPress={onPressRemoveCoupon}>
							<View paddingHorizontal='medium'>
								<Icon
									iconKey='trash-2'
									color={'tertiary-500'}
									width={30}
								/>
							</View>
						</Touchable>
					</>
				) : (
					<>
						<CustomInput
							width='60%'
							placeholder={t('coupon.labelInsertCode')}
							value={coupon}
							onChange={value => inputOnChange(value)}
							maxLength={9}
						/>
						<CustomButton
							variant='outlined'
							onPress={onPressAddCoupon}
							isLoading={isLoading}
							label={t('coupon.txtAdd')}
							width='40%'
						/>
					</>
				)}
			</View>
			{couponTextAlert && (
				<View paddingHorizontal='medium'>
					<Text color={invalidCoupon ? 'tertiary-500' : 'secondary-700'}>{couponTextAlert}</Text>
				</View>
			)}
			<Spacing />
		</View>
	)
}
