import WishlistIcon from './components/WishlistIcon'
import Loading from '../Loading/Loading'

export default function ProductCardFullImage(props) {
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
							onPress={onPressOnWishlist}
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
