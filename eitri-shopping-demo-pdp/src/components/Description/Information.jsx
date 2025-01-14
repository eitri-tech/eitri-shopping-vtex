import { Spacing, Divisor } from 'eitri-shopping-demo-shared'
import { useTranslation } from 'eitri-i18n'

export default function Information(props) {
	const { specifications } = props

	const [collapsed, setCollapsed] = useState(true)

	const { t } = useTranslation()
	
	const toggleCollapsedState = () => {
		setCollapsed(!collapsed)
	}

	return (
		<View>
			{specifications && (
				<View>
					<Touchable onPress={() => toggleCollapsedState()}>
						<View
							display='flex'
							alignItems='center'
							justifyContent='between'
							width='100%'>
							<Text
								fontSize='large'
								fontWeight='bold'>
								{t('information.txtInformation')}
							</Text>
							<Icon
								iconKey={collapsed ? 'chevron-down' : 'chevron-up'}
								width={26}
							/>
						</View>
					</Touchable>
					{!collapsed && (
						<View>
							{specifications.map((specification, index) => (
								<View key={index}>
									{Object.entries(specification).map(([key, value]) => (
										<View
											key={key}
											marginBottom='nano'>
											<View>
												<Text
													fontWeight='bold'
													color='neutral-900'
													marginRight='nano'>{`${key}: `}</Text>
											</View>
											{value.length > 1 ? (
												<View marginTop='quark'>
													{value.map((item, index) => (
														<View
															key={index}
															display='flex'
															direction='column'>
															<Text marginRight='nano'>{item}</Text>
														</View>
													))}
												</View>
											) : (
												<Text>{value}</Text>
											)}
										</View>
									))}
								</View>
							))}
							<Spacing height='20px' />
						</View>
					)}
					<Divisor />
				</View>
			)}
		</View>
	)
}
