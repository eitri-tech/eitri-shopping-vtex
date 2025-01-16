import Eitri from 'eitri-bifrost'
import { Spacing, Loading } from 'eitri-shopping-vtex-components-shared'
import { useTranslation } from 'eitri-i18n'

export default function Coupon(props) {
	const { cart, addCoupon, removeCoupon } = props

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

	return (
		<View>
			<View
				paddingTop='medium'
				paddingHorizontal='medium'>
				<Text
					fontSize='medium'
					fontWeight='bold'>
					{t('coupon.txtCoupon')}
				</Text>
				<View
					display='flex'
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
								borderRadius='medium'
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
							<View
								display='flex'
								marginVertical='small'
								paddingVertical='nano'
								borderWidth='hairline'
								borderColor='neutral-300'
								borderRadius='pill'
								width='60vw'>
								<Input
									placeholder={t('coupon.labelInsertCode')}
									value={coupon}
									borderColor='accent-100'
									color='accent-100'
									onChange={value => inputOnChange(value)}
									borderHidden={true}
								/>
							</View>
							<Touchable onPress={onPressAddCoupon}>
								<View
									display='flex'
									height='50px'
									width='30vw'
									borderWidth='hairline'
									borderColor='secondary-300'
									justifyContent='center'
									alignItems='center'
									borderRadius='pill'>
									{isLoading ? (
										<Loading
											width='30px'
											color='secondary-300'
										/>
									) : (
										<Text
											fontWeight='bold'
											color={isLoading ? 'accent-100' : 'secondary-300'}>
											{t('coupon.txtAdd')}
										</Text>
									)}
								</View>
							</Touchable>
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
		</View>
	)
}
