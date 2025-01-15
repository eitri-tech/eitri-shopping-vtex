import { Vtex } from 'eitri-shopping-vtex-shared'
import { Loading } from 'eitri-shopping-demo-shared'
import icon360 from '../../assets/images/icon-360.png'
import WishlistIcon from '../WishlistIcon/WishlistIcon'
import { useTranslation } from 'eitri-i18n'

export default function ProductCardVertical(props) {
	const {
		ratingValue,
		ratingsCount,
		listPrice,
		image,
		name,
		price,
		width,
		installments,
		isInCart,
		onPress,
		onAddToCart,
		onRemoveFromCart,
		loadingCartOp,
		badge,
		loadingWishlistOp,
		isOnWishlist,
		onAddToWishlist,
		onRemoveFromWishlist,
		hasImage360
	} = props

	const { t } = useTranslation()

	const onPressCard = () => {
		if (onPress && typeof onPress === 'function') {
			onPress()
		}
	}

	const onPressAddToCart = () => {
		if (loadingCartOp) return
		if (isInCart) {
			if (onRemoveFromCart && typeof onRemoveFromCart === 'function') {
				onRemoveFromCart()
			} else {
				console.log('onRemoveFromCart not implemented')
			}
		} else if (onAddToCart && typeof onAddToCart === 'function') {
			onAddToCart()
		} else {
			console.log('onAddToCart not implemented')
		}
	}

	const onPressWishlist = () => {
		if (loadingWishlistOp) return
		if (isOnWishlist) {
			if (onRemoveFromWishlist && typeof onRemoveFromWishlist === 'function') {
				onRemoveFromWishlist()
			} else {
				console.log('onRemoveFromWishlist not implemented')
			}
		} else if (onAddToWishlist && typeof onAddToWishlist === 'function') {
			onAddToWishlist()
		} else {
			console.log('onAddToWishlist not implemented')
		}
	}

	return (
		<View
			position='relative'
			backgroundColor={Vtex?.configs?.account === 'rihappynovo' || 'accent-100'}
			minWidth={width || 'auto'}
			maxWidth={width || 'auto'}
			borderRadius='small'
			padding='small'
			elevation='low'>
			<View direction='column'>
				{badge ? (
					<View
						maxHeight='27px'
						minHeight='27px'
						borderRadius='pill'
						width='fit-content'
						backgroundColor={'positive-300'}
						paddingHorizontal='large'
						paddingVertical='quark'>
						<Text
							fontWeight='bold'
							fontFamily='Baloo 2'>
							{badge}
						</Text>
					</View>
				) : (
					<View height='27px' />
				)}
				{hasImage360 && (
					<View
						position='absolute'
						top='5px'
						right='5px'>
						<Image
							src={icon360}
							width='24px'
							height='24px'
						/>
					</View>
				)}
				<View
					position='relative'
					display='flex'
					direction='column'
					width='100%'
					justifyContent='center'
					borderRadius='micro'
					alignItems='center'
					height='143px'
					minHeight='143px'
					maxHeight='143px'>
					<Image
						src={image}
						maxWidth='100%'
						maxHeight='100%'
						borderRadius='micro'
					/>
				</View>
				<View
					marginTop='small'
					display='flex'
					justifyContent='between'
					maxHeight='36px'
					minHeight='36px'
					gap={4}>
					<Text
						lineClamp={3}
						fontWeight='medium'
						fontSize='extra-small'>
						{name}
					</Text>
					{/* {loadingWishlistOp ? (
						<View
							position='relativo'
							width='34px'
							height='24px'>
							<View
								position='absolute'
								right='-17px'>
								<Loading width='70px' />
							</View>
						</View>
					) : ( */}
					<Touchable
						disabled={loadingWishlistOp}
						onPress={onPressWishlist}
						zIndex={98}>
						<WishlistIcon checked={isOnWishlist} />
					</Touchable>
				</View>

				<View
					direction='column'
					gap={2}
					marginTop='nano'>
					{listPrice ? (
						<Text
							textDecoration='line-through'
							fontWeight='bold'
							color='neutral-500'
							fontSize='nano'>
							{listPrice}
						</Text>
					) : (
						<View height='16px' />
					)}

					<Text
						fontWeight='bold'
						color='primary-700'
						fontSize='small'>
						{price}
					</Text>

					{installments ? (
						<Text
							fontWeight='bold'
							color='neutral-500'
							fontSize='nano'>
							{installments}
						</Text>
					) : (
						<View height='16px' />
					)}
				</View>
				<Touchable
					marginTop='nano'
					height='36px'
					width='100%'
					borderRadius='pill'
					display='flex'
					justifyContent='center'
					alignItems='center'
					borderColor={'primary-700'}
					borderWidth='hairline'
					backgroundColor={loadingCartOp ? 'neutral-100' : 'primary-700'}
					zIndex={99}
					onPress={onPressAddToCart}>
					{loadingCartOp ? (
						<Loading width='36px' />
					) : (
						<Text
							color='background-color'
							fontWeight='medium'
							fontSize='extra-small'>
							{isInCart ? t('productCardVertical.cart') : t('productCardVertical.buy')}
						</Text>
					)}
				</Touchable>
			</View>

			<Touchable
				onPress={onPressCard}
				position='absolute'
				top='0'
				bottom='0'
				left='0'
				right='0'
			/>
		</View>
	)
}
