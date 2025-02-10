import WishlistIcon from './components/WishlistIcon'
import Loading from '../Loading/Loading'

export default function ProductCardDefault(props) {
	const {
		listPrice,
		image,
		name,
		price,
		width,
		installments,
		loadingCartOp,
		loadingWishlistOp,
		isOnWishlist,
		showListItem,
		actionLabel,
		badge,
		onPressOnCard,
		onPressCartButton,
		onPressOnWishlist
	} = props

	return (
		<View
			position='relative'
			backgroundColor={'accent-100'}
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
					<Touchable
						disabled={loadingWishlistOp}
						onPress={onPressOnWishlist}
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
					onPress={onPressCartButton}>
					{loadingCartOp ? (
						<Loading width='36px' />
					) : (
						<Text
							color='background-color'
							fontWeight='medium'
							fontSize='extra-small'>
							{actionLabel}
						</Text>
					)}
				</Touchable>
			</View>

			<Touchable
				onPress={onPressOnCard}
				position='absolute'
				top='0'
				bottom='0'
				left='0'
				right='0'
			/>
		</View>
	)
}
