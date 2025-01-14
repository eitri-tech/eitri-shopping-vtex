export default function HeaderCart(props) {
	const { quantityOfItems, backgroundColor, textColor, iconColor, onPress, width } = props

	return (
		<Touchable
			position='relative'
			onPress={onPress}
			width={width}
			backgroundColor={backgroundColor}>
			<View>
				<Icon
					width={24}
					height={24}
					color={iconColor}
					iconKey='shopping-cart'
				/>
			</View>

			{quantityOfItems > 0 && (
				<View
					position='absolute'
					top={-10}
					right={-10}
					display='flex'
					backgroundColor={iconColor || 'primary-700'}
					borderRadius='circular'
					width={20}
					height={20}
					justifyContent='center'
					alignItems='center'>
					<Text
						color={textColor || 'accent-100'}
						fontWeight='bold'
						fontSize='quark'>
						{quantityOfItems}
					</Text>
				</View>
			)}
		</Touchable>
	)
}
