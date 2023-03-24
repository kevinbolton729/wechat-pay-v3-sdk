export interface BaseOrderParams {
  /** 商品描述 */
  description: string
  /** 商户系统内部订单号，只能是数字、大小写字母_-*且在同一个商户号下唯一 */
  out_trade_no: string
  /** 订单失效时间，遵循rfc3339标准格式，格式为yyyy-MM-DDTHH:mm:ss+TIMEZONE，yyyy-MM-DD表示年月日，T出现在字符串中，表示time元素的开头，HH:mm:ss表示时分秒，TIMEZONE表示时区（+08:00表示东八区时间，领先UTC8小时，即北京时间）。例如：2015-05-20T13:29:35+08:00表示，北京时间2015年5月20日 13点29分35秒。 */
  time_expire?: string
  /** 附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用，实际情况下只有支付完成状态才会返回该字段。 */
  attach?: string
  /** 异步接收微信支付结果通知的回调地址，通知url必须为外网可访问的url，不能携带参数。 公网域名必须为https，如果是走专线接入，使用专线NAT IP或者私有回调域名可使用http */
  notify_url: string
  /** 订单优惠标记 */
  goods_tag?: string
  /** 电子发票入口开放标识,传入true时，支付成功消息和支付详情页将出现开票入口。需要在微信支付商户平台或微信公众平台开通电子发票功能，传此字段才可生效。 */
  support_fapiao?: boolean
  /** 订单金额信息 */
  amount: OrderParamsAmount
  /** 支付者 */
  payer?: any
  /** 优惠功能 */
  detail?: OrderParamsDetail
  /** 支付场景描述 */
  scene_info?: OrderParamsSceneInfo
  /** 结算信息 */
  settle_info?: OrderParamsSettleInfo
}

export interface OrderParamsAmount {
  /** 总金额,单位为分 */
  total?: number
  /** 货币类型,默认CNY，境内商户号仅支持人名币 */
  currency?: string
}

export interface OrderParamsDetail {
  /** 商品小票ID */
  invoice_id?: string
  /** 订单原价 */
  cost_price?: number
  /** 商品列表 */
  goods_detail?: OrderParamsDetailGoodsDetail[]
}

export interface OrderParamsDetailGoodsDetail {
  /** 商品编码 */
  merchant_goods_id: string
  /** 微信侧商品编码 */
  wechatpay_goods_id?: string
  /** 商品名称 */
  goods_name: string
  /** 商品数量 */
  quantity: number
  /** 商品单价，单位为分 */
  unit_price: number
}

export interface OrderParamsSceneInfo {
  /** 商户端设备号 */
  device_id?: string
  /** 用户终端ip */
  payer_client_ip: string
  /** 商户门店信息 */
  store_info: OrderParamsSceneInfoStoreInfo
}

export interface OrderParamsSceneInfoStoreInfo {
  /** 门店编号 */
  id: string
  /** 门店名称 */
  name?: string
  /** 门店行政区划码 */
  area_code?: string
  /** 门店详细地址 */
  address?: string
}

export interface OrderParamsSettleInfo {
  /** 是否指定分账 */
  profit_sharing?: boolean
}

/**
 * appid && mchid
 */
export interface BusinessToken {
  /** 应用ID */
  appid: string
  /** 直连商户号 */
  mchid: string
}

/**
 * sp_appid && sp_mchid
 */
export interface ProviderToken {
  sp_appid: string
  sp_mchid: string
}
/**
 * sub_mchid && [sub_appid]
 */
export interface SubToken {
  sub_appid?: string
  sub_mchid: string
}

export interface BusinessPayerToken {
  openid: string
}

export interface ProviderPayerToken {
  sp_openid?: string
  sub_openid?: string
}

export interface JSAPI_Oder_Business extends BaseOrderParams, BusinessToken {
  payer: BusinessPayerToken
}

export interface JSAPI_Oder_Provider extends BaseOrderParams, ProviderToken, SubToken {
  payer: ProviderPayerToken
}
export interface BaseQueryOrderWithTid {
  /** 微信支付订单号 */
  transaction_id: string
}

export interface JSAPI_QueryOrder_tid_Business extends BaseQueryOrderWithTid {
  mchid: string
}

export interface JSAPI_QueryOrder_tid_Provider extends BaseQueryOrderWithTid {
  sp_mchid: string
  sub_mchid: string
}

export interface BaseQueryOrderWithOutTradeNo {
  /** 商户订单号 */
  out_trade_no: string
}

export interface JSAPI_QueryOrder_outTradeNo_Business extends BaseQueryOrderWithOutTradeNo {
  mchid: string
}

export interface JSAPI_QueryOrder_outTradeNo_Provider extends BaseQueryOrderWithOutTradeNo {
  sp_mchid: string
  sub_mchid: string
}

export interface BaseQueryOrderResult {
  /** 商户订单号 */
  out_trade_no: string
  /** 微信支付订单号 */
  transaction_id: string
  /** 交易类型 */
  trade_type: TradeTypeEnum
  /** 交易状态 */
  trade_state: TradeStateEnum
  /** 交易状态描述 */
  trade_state_desc: string
  /** 付款银行 */
  bank_type: string
  /** 附加数据 */
  attach: string
  /** 支付完成时间 */
  success_time: string
  /** 支付者信息 */
  payer?: any
  /** 订单金额信息 */
  amount?: QueryOrderAmount
  /** 支付场景描述 */
  scene_info?: {
    /** 商户端设备号 */
    device_id: string
  }
  /** 优惠功能 */
  promotion_detail?: QueryOrderPromotionDetail[]
}

export enum TradeTypeEnum {
  /** 公众号支付 */
  JSAPI = 'JSAPI',
  /** 扫码支付 */
  NATIVE = 'NATIVE',
  /** APP支付 */
  APP = 'APP',
  /** 付款码支付 */
  MICROPAY = 'MICROPAY',
  /** H5支付 */
  MWEB = 'MWEB',
  /** 刷脸支付 */
  FACEPAY = 'FACEPAY',
}

export enum TradeStateEnum {
  /** 支付成功 */
  SUCCESS = 'SUCCESS',
  /** 转入退款 */
  REFUND = 'REFUND',
  /** 未支付 */
  NOTPAY = 'NOTPAY',
  /** 已关闭 */
  CLOSED = 'CLOSED',
  /** 已撤销（仅付款码支付会返回） */
  REVOKED = 'REVOKED',
  /** 用户支付中（仅付款码支付会返回） */
  USERPAYING = 'USERPAYING',
  /** 支付失败（仅付款码支付会返回） */
  PAYERROR = 'PAYERROR',
}

export interface QueryOrderAmount {
  /** 订单金额 */
  total: number
  /** 用户支付金额 */
  payer_total: number
  /** 用户支付币种 */
  payer_currency: string
  /** 货币类型 */
  currency: string
}

export interface QueryOrderPromotionDetail {
  /** 券ID */
  coupon_id: string
  /** 优惠名称 */
  name?: string
  /** 优惠范围 */
  scope?: 'GLOBAL' | 'SINGLE'
  /** 优惠类型 */
  type?: 'CASH' | 'NOCASH'
  /** 优惠券面额 */
  amount: number
  /** 活动id */
  stock_id?: string
  /** 微信出资 */
  wechatpay_contribute?: number
  /** 商户出资 */
  merchant_contribute?: number
  /** 其他出资 */
  other_contribute?: number
  /** 优惠币种 */
  currency?: string
  /** 单品列表 */
  goods_detail?: QueryOrderGoodsDetail[]
}

export interface QueryOrderGoodsDetail {
  /** 商品编码 */
  goods_id: string
  /** 商品数量 */
  quantity: number
  /** 商品单价 */
  unit_price: number
  /** 商品优惠金额 */
  discount_amount: number
  /** 商品备注 */
  goods_remark?: string
}

export interface QueryOrderResult_Business extends BaseQueryOrderResult, BusinessToken {}

export interface QueryOrderResult_Provider extends BaseQueryOrderResult, ProviderToken, SubToken {}

export interface ReqPaymentParams {
  /** appid,若下单时候传了sub_appid,须为sub_appid的值 */
  appId: string
  /** 预支付订单号,下单接口返回 */
  prepay_id: string
}
