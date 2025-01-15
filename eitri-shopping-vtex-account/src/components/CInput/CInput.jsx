import eyeOn from '../../assets/icons/eye-on.svg'
import eyeOff from '../../assets/icons/eye-off.svg'

export default function CInput(props) {
	const { icon, type, backgroundColor, mask, ...rest } = props

	const [showPassword, setShowPassword] = useState(false)

	return (
		<View
			backgroundColor={backgroundColor || 'neutral-100'}
			borderColor='neutral-300'
			borderWidth='hairline'
			height='48px'
			display='flex'
			alignItems='center'
			color='neutral-500'
			paddingHorizontal='small'
			borderRadius='pill'>
			{icon && (
				<View>
					<Image src={icon} />
				</View>
			)}
			{mask ? (
				<MaskedInput
					borderHidden={true}
					mask={mask}
					{...rest}
				/>
			) : (
				<Input
					borderHidden={true}
					type={showPassword ? 'text' : type || 'text'}
					{...rest}
				/>
			)}
			{type === 'password' && (
				<Touchable onPress={() => setShowPassword(!showPassword)}>
					<Image src={showPassword ? eyeOn : eyeOff} />
				</Touchable>
			)}
		</View>
	)
}
