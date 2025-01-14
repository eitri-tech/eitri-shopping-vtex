import CollapsableView from './components/CollapsableView'
import SelectableTouchable from './components/SelectableTouchable'
import { Loading } from 'eitri-shopping-demo-shared'
import { useTranslation } from 'eitri-i18n'

export default function CategoryPageModal(props) {
	const {
		show,
		onClose,
		facets,
		removeFilter,
		addFilter,
		clearFilters,
		executeSearch,
		facetsLoading,
		listOrdering,
		addOrdering
	} = props

	const { t } = useTranslation()

	return (
		<Modal
			show={show}
			position={'bottom'}
			closeOnPressOut={true}
			transition='background-color 0.5s ease-in-out'
			onClose={onClose}>
			<View
				bottomInset
				backgroundColor='background-color'
				borderRadiusRightTop='small'
				borderRadiusLeftTop='small'
				minHeight='70vh'
				overflow='scroll'
				width='100vw'>
				<View
					padding='small'
					marginHorizontal='nano'
					display='flex'
					direction='row'
					justifyContent='between'
					alignItems='center'>
					<Text
						fontSize='extra-large'
						fontWeight='medium'>
						{`${t('categoryPageModal.title')}`}
					</Text>
					<Touchable
						width='36px'
						height='36px'
						borderRadius='circular'
						backgroundColor='neutral-100'
						alignItems='center'
						justifyContent='center'
						onPress={onClose}>
						<Icon
							iconKey='x'
							height={20}
							width={20}
						/>
					</Touchable>
				</View>
				<View marginHorizontal='nano'>
					{facetsLoading ? (
						<Loading inline />
					) : (
						<>
							<View
								gap={8}
								padding='small'
								display='flex'
								flexWrap='wrap'>
								{facets &&
									facets.map(facet =>
										facet.values
											.filter(value => value.selected)
											.map(value => (
												<Touchable
													key={value.value}
													onPress={() => removeFilter(value)}
													display='flex'
													alignItems='center'
													gap={8}
													paddingVertical='nano'
													paddingHorizontal='small'
													width='fit-content'
													backgroundColor='primary-700'
													borderRadius='pill'>
													<Text
														color={'background-color'}
														fontWeight='bold'
														fontSize='nano'>
														{value.name}
													</Text>
													<Icon
														color='background-color'
														iconKey='x'
														height={20}
														width={20}
													/>
												</Touchable>
											))
									)}
							</View>

							{listOrdering && (
								<CollapsableView
									key={listOrdering.key}
									title={listOrdering.title}
									willStartCollapsed={false}
									border='none'
									fontWeight='light'>
									<View
										display='flex'
										direction='column'
										gap={16}>
										{listOrdering.values.map(value => (
											<Touchable
												key={value.id}
												gap={8}
												display='flex'
												alignItems='center'
												onPress={() =>
													addOrdering({ key: value.categoryKey, value: value.value })
												}>
												<Radio checked={value.checked} />
												{value.name}
											</Touchable>
										))}
									</View>
								</CollapsableView>
							)}
							{facets &&
								facets.map(facet => (
									<CollapsableView
										key={facet.key}
										title={facet.name}
										willStartCollapsed={false}
										border='none'
										fontWeight='light'>
										<View
											display='flex'
											direction='column'
											gap={16}>
											{facet.values.map(value => (
												<SelectableTouchable
													key={`${facet.key}_${value.value}`}
													categoryKey={value.key}
													name={`${value.name}`}
													value={`${value.value}`}
													removeCategory={removeFilter}
													addCategory={addFilter}
													checked={value.selected}
												/>
											))}
										</View>
									</CollapsableView>
								))}
						</>
					)}

					<View height={120} />

					<View
						position='fixed'
						bottom={0}
						left={0}
						right={0}
						paddingVertical='nano'
						paddingHorizontal='small'
						backgroundColor='background-color'
						elevation={'highest'}>
						<View
							width='100%'
							display='flex'
							justifyContent='center'
							height='48px'
							gap='16px'>
							<Touchable
								borderRadius='pill'
								display='flex'
								padding='small'
								alignItems='center'
								justifyContent='center'
								borderColor='primary-700'
								borderWidth='hairline'
								onPress={clearFilters}
								grow={1}
								backgroundColor='background-color'>
								<Text color='primary-700'>{t('categoryPageModal.clear')}</Text>
							</Touchable>

							<Touchable
								onPress={executeSearch}
								borderRadius='pill'
								display='flex'
								padding='small'
								alignItems='center'
								justifyContent='center'
								grow={1}
								backgroundColor='primary-700'
								fontWeight='bold'>
								<Text
									color='neutral-100'
									fontWeight='bold'>
									{t('categoryPageModal.button')}
								</Text>
							</Touchable>
						</View>

						<View bottomInset />
					</View>
				</View>
			</View>
		</Modal>
	)
}
