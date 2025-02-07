import trash from '../../assets/images/trash-01.svg'
import Quantity from '../Quantity/Quantity'
import SaveButton from '../SaveButton/SaveButton'
import { Spacing, Loading } from 'eitri-shopping-vtex-components-shared'
import { addToWishlist, checkWishlistItem, removeItemFromWishlist } from '../../services/customerService'
import ModalConfirm from '../ModalConfirm/ModalConfirm'
import { useTranslation } from 'eitri-i18n'
import { formatAmountInCents } from '../../utils/utils'

export default function CartItem(props) {
	const {
		item,
		onChangeQuantityItem,
		message,
		handleRemoveCartItem,
		onAddOfferingToCart,
		onRemoveOfferingFromCart,
		locale,
		currency
	} = props
	const [loadingWishlist, setLoadingWishlist] = useState(false)
	const [wishlistId, setWishlistId] = useState('')
	const [showModalRemoveItem, setShowModalRemoveItem] = useState(false)

	const resizedImageUrl = item.imageUrl.replace('60-60', '200-200')

	const { t } = useTranslation()

	useEffect(() => {
		checkWishlist()
	}, [])

	const checkWishlist = async () => {
		setLoadingWishlist(true)
		const { inList, listId } = await checkWishlistItem(item.productId)
		if (inList) {
			setWishlistId(listId)
		}
		setLoadingWishlist(false)
	}

	const handleSaveFavorite = async () => {
		try {
			setLoadingWishlist(true)
			if (wishlistId) {
				await removeItemFromWishlist(wishlistId)
				setWishlistId('')
			} else {
				const result = await addToWishlist(item.productId, item.name, item.id)
				setWishlistId(result?.data?.addToList)
			}
			setLoadingWishlist(false)
		} catch (e) {
			setLoadingWishlist(false)
		}
	}

	const handleQuantityOfItemsCart = quantityToUpdate => {
		onChangeQuantityItem(item.quantity + quantityToUpdate, item.itemIndex)
	}

	const removeCartItem = confirm => {
		if (confirm) {
			handleModalRemoveItem()
			handleRemoveCartItem(item.itemIndex)
			return
		}
		handleModalRemoveItem()
	}

	const handleModalRemoveItem = () => {
		setShowModalRemoveItem(!showModalRemoveItem)
	}

	return (
		<View>
			<View
				marginTop='extra-small'
				backgroundColor='neutral-100'
				display='flex'
				padding='small'
				direction='column'>
				<View
					display='flex'
					justifyContent='center'
					alignItems='start'>
					<View
						display='flex'
						alignItems='center'
						justifyContent='center'
						maxWidth='30%'>
						<Image
							borderRadius='small'
							maxHeight='100px'
							maxWidth='100%'
							src={resizedImageUrl}
						/>
					</View>
					<View
						display='flex'
						direction='column'
						justifyContent='between'
						width='55%'
						gap={9}
						paddingLeft='nano'>
						<Text
							color='neutral-900'
							fontWeight='medium'
							fontSize='nano'>
							{item.name}
						</Text>
						<Text
							color='primary-700'
							fontWeight='bold'
							fontSize='medium'>
							{formatAmountInCents(item.price, locale, currency)}
						</Text>
						{item?.offerings?.length > 0 &&
							!message &&
							item?.offerings
								?.filter(o => !o.isBundled)
								.map((offering, index) => (
									<Touchable
										key={offering.id + index}
										onPress={() => onAddOfferingToCart(item.itemIndex, offering.id)}
										borderWidth='hairline'
										borderRadius='small'
										padding='nano'
										display='flex'
										justifyContent='center'
										alignItems='center'
										borderColor='primary-700'>
										<Text
											fontSize='nano'
											color='primary-700'
											fontWeight='medium'>
											{`${t('cartItem.txtAdd')} ${offering?.name} ${offering?.price ? formatAmountInCents(offering.price, locale, currency) : ''}`}
										</Text>
									</Touchable>
								))}
						<View
							display='flex'
							justifyContent='between'
							height='30%'
							alignItems='center'>
							{!message && (
								<Quantity
									quantity={item.quantity}
									handleItemQuantity={handleQuantityOfItemsCart}
								/>
							)}
							{loadingWishlist ? (
								<View>
									<Loading width='30px' />
								</View>
							) : (
								<SaveButton
									handleSaveFavorite={() => handleSaveFavorite(item.id)}
									isInWishlist={!!wishlistId}
								/>
							)}
						</View>
					</View>
					<View
						display='flex'
						width='15%'
						justifyContent='center'
						height='130px'>
						<Touchable onPress={handleModalRemoveItem}>
							<Image
								src={trash}
								height='20px'
							/>
						</Touchable>
					</View>
				</View>
				{message && (
					<View
						display='flex'
						direction='column'
						justifyContent='center'
						alignItems='center'>
						<Spacing height={'10px'} />
						<Text
							textAlign='center'
							color='tertiary-500'>
							{message.text || t('cartItem.txtMessageUnavailable')}
						</Text>
						<Spacing height={'10px'} />
					</View>
				)}
			</View>
			{item?.offerings?.length > 0 &&
				item?.offerings
					?.filter(o => o.isBundled)
					.map((offering, index) => (
						<View
							key={offering.id + index}
							backgroundColor='neutral-100'>
							<View
								backgroundColor='background-color'
								width='100%'
								height='2px'
							/>
							<View
								paddingVertical='nano'
								paddingHorizontal='large'
								display='flex'
								justifyContent='between'
								alignItems='center'>
								<Text
									fontSize='nano'
									fontWeight='medium'>
									{`${offering?.name}: ${offering?.price ? formatAmountInCents(offering.price, locale, currency) : ''}`}
								</Text>
								<Touchable onPress={() => onRemoveOfferingFromCart(item.itemIndex, offering.id)}>
									<Image
										src={trash}
										height='16px'
									/>
								</Touchable>
							</View>
						</View>
					))}
			<ModalConfirm
				text={t('cartItem.txtRemoveCart')}
				showModal={showModalRemoveItem}
				closeModal={handleModalRemoveItem}
				removeItem={removeCartItem}
			/>
		</View>
	)
}
