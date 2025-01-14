export default function ModalImage3d(props) {
	const { frameUrl, visible, onClose } = props

	return (
		<Modal
			closeOnPressOut={true}
			show={visible}
			position={'bottom'}
			showBackdrop={true}
			transition='background-color 0.5s ease-in-out'
			onClose={onClose}>
			<View
				position='relative'
				backgroundColor='background-color'
				height='70vh'
				width='100vw'>
				<HtmlRenderer
					allowUnsafeIframe={true}
					height='100%'
					htmlString={`
								<iframe
									allow="fullscreen; autoplay; playsinline; picture-in-picture;clipboard-read; clipboard-write;"
									style="height: 100%; width:100%; border: none;"
									src="${frameUrl}">
								</iframe>`}
				/>
				<Touchable
					width='28px'
					height='28px'
					borderRadius='pill'
					backgroundColor='primary-500'
					position='absolute'
					display='flex'
					alignItems='center'
					justifyContent='center'
					contentColor
					top={12}
					right={12}
					onPress={onClose}>
					<Icon
						iconKey='x'
						width={16}
						height={16}
					/>
				</Touchable>
			</View>
		</Modal>
	)
}
