import Eitri from 'eitri-bifrost'

export default function HeaderReturn(props) {
	const { backPage, backgroundColor, borderColor, iconColor, onPress, width } = props

	const onBack = () => {
		if (typeof onPress === 'function') {
			return onPress()
		} else {
			if (backPage) {
				Eitri.navigation.back(backPage)
			} else {
				Eitri.navigation.back()
			}
		}
	}

	return (
		<Touchable
			onPress={() => onBack()}
      display='flex'
      alignItems='center'
      justifyContent='center'
			width={width}>
        <Icon
          iconKey='chevron-left'
          color={iconColor || 'neutral-900'}
          width={30}
          height={30}
        />
		</Touchable>
	)
}
