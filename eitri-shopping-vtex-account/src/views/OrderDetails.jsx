import { Vtex } from 'eitri-shopping-vtex-shared'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-demo-shared'
import formatDate, { formatDateDaysMonthYear } from '../utils/Date'
import OrderStatusBadge from '../components/OrderList/OrderStatusBadge'
import OrderProductCard from '../components/OrderList/OrderProductCard'
import Eitri from 'eitri-bifrost'
import ProtectedView from '../components/ProtectedView/ProtectedView'
import { sendPageView } from '../services/TrackingService'

export default function OrderDetails(props) {
	const [order, setOrders] = useState(props?.history?.location?.state?.orderId)
	const [adress, setAdress] = useState('')
	const [products, setProducts] = useState('')
	const [orderSumary, setOrderSumary] = useState('')
	const [paymentDetails, setPaymentDetails] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const [cancelConfirmation, setCancelConfirmation] = useState(false)
	const [cancelReason, setCancelReason] = useState('')

	//const orderList = Vtex.customer.listOrders(0);
	useEffect(() => {
		try {
			const orderId = props?.history?.location?.state?.orderId
			if (!orderId) {
				Eitri.navigation.navigate({ path: 'OrderList', replace: true })
			}
			handleOrder(orderId)
			sendPageView('Detalhes do pedido')
		} catch (error) {
			console.log('deu erro', error)
		}
	}, [])

	const formatAmountInCents = amount => {
		if (typeof amount !== 'number') {
			return ''
		}
		if (amount === 0) {
			return 'Grátis'
		}
		return (amount / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
	}

	const handleOrder = async id => {
		try {
			const orders = await Vtex.customer.getOrderById(id)
			setOrders(orders)
			setProducts(orders.items)
			setAdress(orders.shippingData.address)
			setPaymentDetails(orders.paymentData.transactions[0].payments[0])
			setOrderSumary(orders.totals)
			setIsLoading(false)
		} catch (error) {
			console.log('Erro ao pegar orders', error)
			Eitri.navigation.navigate({ path: 'OrderList', replace: true })
		}
	}

	const cancelOrder = async () => {
		try {
			setIsLoading(true)
			if (!cancelReason) {
				return
			}
			const payload = { reason: cancelReason }
			await Vtex.customer.cancelOrder(order.orderId, payload)
			Eitri.navigation.back()
		} catch (e) {
			console.log('Erro ao cancelar pedido', e)
		}
	}

	const getFormattedPaymentSystem = payment => {
		if (!payment) return null

		if (payment.paymentSystem === '6') {
			return (
				<View
					width='100%'
					display='flex'
					justifyContent='between'>
					<Text block>{payment.paymentSystemName} </Text>
					{order.status === 'payment-pending' && (
						<Touchable onPress={() => Eitri.openBrowser({ url: payment.url })}>
							<Text
								block
								color='primary-500'
								fontWeight='bold'>
								Ver boleto
							</Text>
						</Touchable>
					)}
				</View>
			)
		}

		return (
			<Text>{`${payment.paymentSystemName} ${formatAmountInCents(payment.value)} (${
				payment.installments
			}x)`}</Text>
		)
	}

	const handleShippingEstimate = (shippingEstimate) => {
		return shippingEstimate.replace(/[a-zA-Z]/g, '')
	}

	return (
		<ProtectedView
			afterLoginRedirectTo={'OrderDetails'}
			redirectState={{ orderId: props?.history?.location?.state?.orderId }}>
			<Window bottomInset topInset>
				<HeaderTemplate
					headerType={HEADER_TYPE.RETURN_AND_TEXT}
					viewBackButton={true}
					contentText={'Meus Pedidos'}
				/>

				<View>
					{isLoading ? (
						<Loading fullScreen />
					) : (
						<View padding='small'>
							<View
								marginTop='medium'
								justify='center'
								align='left'
								borderRadius='medium'
								borderWidth='hairline'
								borderColor='neutral-500'>
								<View
									direction='column'
									gap='16px'
									padding='small'>
									<View
										display='flex'
										direction='row'
										alignItems='center'
										justifyContent='between'>
										<View
											direction='column'
											gap='5px'>
											<Text
												block
												fontSize='small'>
												[b]Pedido:[/b]
											</Text>
											<Text block>{order.orderId}</Text>
										</View>

										<OrderStatusBadge
											statusId={order.status}
											statusDescription={order.statusDescription}
										/>
									</View>

									<View
										direction='column'
										gap='5px'>
										<Text
											block
											fontSize='small'>
											[b]Data do pedido:[/b]
										</Text>
										<Text block>{formatDateDaysMonthYear(order.creationDate)}</Text>
									</View>

									<View
										direction='column'
										gap='5px'>
										<Text
											block
											fontSize='small'>
											[b]Endereço[/b]
										</Text>
										<View>
											<Text block>[b]{adress.receiverName}[/b]</Text>
											<View
												direction='column'
												display='flex'>
												<Text
													block
													fontSize='extra-small'>
													{`${adress.street}, ${adress.number} ${
														adress.complement ? ' - ' + adress.complement : ''
													}`}
												</Text>
												<Text
													block
													fontSize='extra-small'>
													{`${adress.city} - ${adress.state} - ${adress.neighborhood} - ${adress.postalCode}`}
												</Text>
											</View>
										</View>
									</View>

									<View
										width='100%'
										direction='column'
										gap='5px'>
										<Text fontSize='small'>[b]Forma de pagamento[/b]</Text>
										<View display='flex'>
											{order?.paymentData?.transactions[0]?.payments?.map(payment =>
												getFormattedPaymentSystem(payment)
											)}
										</View>
									</View>

									<View
										width='100%'
										direction='column'
										gap='5px'>
										<Text fontSize='small'>[b]Entrega[/b]</Text>
										<View display='flex'>
											{order?.shippingData?.logisticsInfo[0]?.shippingEstimateDate ? (
												<Text
													block
													fontSize='extra-small'>{`Entrega até ${formatDate(order?.shippingData?.logisticsInfo[0]?.shippingEstimateDate)}`}</Text>
											) : (
												<Text
													block
													fontSize='extra-small'>{`Prazo de ${handleShippingEstimate(order?.shippingData?.logisticsInfo[0]?.shippingEstimate)} dias úteis após aprovação do pagamento`}</Text>
											)}
										</View>
									</View>

									<View
										direction='column'
										gap='5px'>
										<Text
											block
											fontSize='small'>
											[b]Resumo[/b]
										</Text>
										<View direction='column'>
											{order &&
												order?.totals?.map(total => (
													<>
														{total.value > 0 && (
															<Text block>{`${total?.name}: ${formatAmountInCents(
																total.value
															)}`}</Text>
														)}
													</>
												))}
											<Text block>
												{`Total: ${
													orderSumary &&
													formatAmountInCents(
														orderSumary
															.map(item => item.value)
															.reduce((acc, curr) => acc + curr, 0)
													)
												}`}
											</Text>
										</View>
									</View>

									{order?.allowCancellation && (
										<View
											display='flex'
											alignItems='center'
											width='100%'>
											{cancelConfirmation ? (
												<View>
													<Text
														block
														fontSize='small'
														fontWeight='bold'>
														Selecione o motivo para o cancelamento
													</Text>
													<Dropdown
														value={cancelReason}
														placeholder='Selecione o motivo'
														onChange={value => setCancelReason(value)}>
														<Dropdown.Item
															value='Não quero mais este produto.'
															label='Não quero mais este produto.'
														/>
														<Dropdown.Item
															value='Comprei sem querer.'
															label='Comprei sem querer.'
														/>
														<Dropdown.Item
															value='A entrega vai demorar demais.'
															label='A entrega vai demorar demais.'
														/>
														<Dropdown.Item
															value='Encontrei um preço melhor em outro lugar.'
															label='Encontrei um preço melhor em outro lugar.'
														/>
														<Dropdown.Item
															value='Prefiro não informar.'
															label='Prefiro não informar.'
														/>
														<Dropdown.Item
															value='Outro'
															label='Outro'
														/>
													</Dropdown>
													<View
														display='flex'
														justifyContent='between'
														marginTop='small'>
														<Touchable onPress={() => setCancelConfirmation(false)}>
															<Text
																block
																color='primary-700'
																fontSize='small'
																fontWeight='bold'>
																Voltar
															</Text>
														</Touchable>
														<Touchable onPress={cancelOrder}>
															<Text
																block
																color={cancelReason ? 'negative-700' : ''}
																fontSize='small'
																fontWeight='bold'>
																Continuar cancelamento
															</Text>
														</Touchable>
													</View>
												</View>
											) : (
												<Touchable onPress={() => setCancelConfirmation(true)}>
													<Text
														block
														color='negative-700'
														fontWeight='bold'>
														Cancelar pedido
													</Text>
												</Touchable>
											)}
										</View>
									)}
								</View>

								<View
									backgroundColor='neutral-100'
									borderTopWidth='hairline'
									borderColor='neutral-500'
									borderRadiusRightBottom='medium'
									borderRadiusLeftBottom='medium'
									padding='nano'>
									{products && (
										<OrderProductCard
											orderId={order.orderId}
											productItems={products}
											key='id'
											delivery={
												order.ShippingEstimatedDateMax &&
												formatDate(order.ShippingEstimatedDateMax)
											}
										/>
									)}
								</View>
							</View>
						</View>
					)}
				</View>
			</Window>
		</ProtectedView>
	)
}

// props?.location?.state?.product.productName
