import { Vtex } from 'eitri-shopping-vtex-shared'
import { Loading } from 'eitri-shopping-vtex-components-shared'
import icon360 from '../../assets/images/icon-360.png'
import WishlistIcon from '../WishlistIcon/WishlistIcon'
import { useTranslation } from 'eitri-i18n'

export default function ProductCardFullImage(props) {
	const {
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
		loadingWishlistOp,
		isOnWishlist,
		onAddToWishlist,
		onRemoveFromWishlist,
		showListItem
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
			backgroundColor={'accent-100'}
			minWidth={width || 'auto'}
			maxWidth={width || 'auto'}
			borderRadius='small'
			elevation='low'>
			<View direction='column'>
				<View
					position='relative'
					display='flex'
					direction='column'
					width='100%'
					justifyContent='center'
					borderRadius='micro'
					alignItems='center'
					height='240px'
					minHeight='240px'
					maxHeight='240px'>
					<View
						width='100%'
						height='100%'
						backgroundImage={image}
						backgroundSize='cover'
						backgroundPositionY='center'
						backgroundPositionX='center'
						borderRadiusRightTop='micro'
						borderRadiusLeftTop='micro'
					/>
					<View
						position='absolute'
						top='5px'
						right='5px'
						width='30px'
						height='30px'
						display='flex'
						alignItems='center'
						justifyContent='center'
						borderRadius='circular'
						backgroundColor='accent-100'>
						<Touchable
							disabled={loadingWishlistOp}
							onPress={onPressWishlist}
							zIndex={98}>
							<WishlistIcon checked={isOnWishlist} />
						</Touchable>
					</View>
				</View>

				<View padding='small'>
					<View
						marginTop='small'
						display='flex'
						justifyContent='between'
						maxHeight='36px'
						minHeight='36px'
						gap={4}>
						<Text
							lineClamp={2}
							fontWeight='medium'
							fontSize='extra-small'>
							{name}
						</Text>
					</View>

					<View
						direction='column'
						gap={2}
						marginTop='nano'>
						{showListItem && (
							<>
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
							</>
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

					<View>{}</View>
				</View>

				<Touchable
					height='36px'
					width='100%'
					display='flex'
					justifyContent='center'
					alignItems='center'
					borderColor='primary-700'
					borderWidth='hairline'
					borderRadiusRightBottom='micro'
					borderRadiusLeftBottom='micro'
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
							{isInCart ? t('productCardVertical.txtSeeCart') : t('productCardVertical.txtBuy')}
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
