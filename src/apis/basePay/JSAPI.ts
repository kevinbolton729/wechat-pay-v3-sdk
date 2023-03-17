import type { WechatPayV3Base } from 'src/base'
import type {
  JSAPI_Oder_Business,
  JSAPI_Oder_Provider,
  JSAPI_QueryOrder_tid_Business,
  JSAPI_QueryOrder_tid_Provider,
  QueryOrderResult_Business,
  QueryOrderResult_Provider,
} from './basePay.types'

/**
 * 基础支付-JSAPI
 */
export class JSAPI {
  static UrlMap = {
    order: {
      provider: `https://api.mch.weixin.qq.com/v3/pay/partner/transactions/jsapi`,
      business: `https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi`,
    },
    transactionIdQueryOrder: {
      provider: 'https://api.mch.weixin.qq.com/v3/pay/partner/transactions/id/', //后面加上订单号
      business: 'https://api.mch.weixin.qq.com/v3/pay/transactions/id/', //后面加上订单号
    },
    outTradeNoQueryOrder: {
      provider: 'https://api.mch.weixin.qq.com/v3/pay/partner/transactions/out-trade-no/', //后面加上订单号
      business: 'https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/', //后面加上订单号
    },
  }
  constructor(private base: WechatPayV3Base) {}
  //=========================================下单
  private async _order(data: any) {
    //这里不用类型标注,因为typescript当前版本不会缩减范围
    const isBusiness = data.appid !== undefined
    const apiUrl = isBusiness ? JSAPI.UrlMap.order.business : JSAPI.UrlMap.order.provider
    const result = await this.base.request.post<{ prepay_id: string }>(apiUrl, data)
    return result.data
  }
  /** 下单-直连商户 */
  async order(data: JSAPI_Oder_Business) {
    return this._order(data)
  }
  /** 下单-服务商 */
  async orderOnProvider(data: JSAPI_Oder_Provider) {
    return this._order(data)
  }
  //=========================================查询订单_通过微信订单号
  private async _transactionIdQueryOrder(data: any) {
    //这里不用类型标注,因为typescript当前版本不会缩减范围
    const isBusiness = data.mchid !== undefined
    const apiUrl = isBusiness
      ? JSAPI.UrlMap.transactionIdQueryOrder.business
      : JSAPI.UrlMap.transactionIdQueryOrder.provider
    const result = await this.base.request.get(apiUrl + data.transaction_id)
    return result.data
  }
  /**
   * 查询订单-通过微信订单号
   */
  async transactionIdQueryOrder(data: JSAPI_QueryOrder_tid_Business) {
    return this._transactionIdQueryOrder(data)
  }
  /**
   * 查询订单-服务商-通过微信订单号
   */
  async transactionIdQueryOrderOnProvider(data: JSAPI_QueryOrder_tid_Provider) {
    return this._transactionIdQueryOrder(data)
  }
  //=========================================查询订单_通过商户订单号
  async _outTradeNoQueryOrder<T = any>(data: any) {
    const isBusiness = data.mchid !== undefined
    const apiUrl = isBusiness ? JSAPI.UrlMap.outTradeNoQueryOrder.business : JSAPI.UrlMap.outTradeNoQueryOrder.provider
    const result = await this.base.request.get<T>(apiUrl + data.out_trade_no)
    return result.data
  }
  /**
   * 查询订单-通过商户订单号
   */
  async outTradeNoQueryOrder(data: JSAPI_QueryOrder_tid_Business) {
    return this._outTradeNoQueryOrder<QueryOrderResult_Business>(data)
  }
  /**
   * 查询订单-服务商-通过商户订单号
   */
  async outTradeNoQueryOrderOnProvider(data: JSAPI_QueryOrder_tid_Provider) {
    return this._outTradeNoQueryOrder<QueryOrderResult_Provider>(data)
  }
}
