import masterchefABI from '../abi/masterchef.json';
import masterchefRhABI from '../abi/masterchefRh.json';
import IERC20ABI from '../abi/erc20.json';
import StockTokenABI from '../abi/stockToken.json';
import StockPoolABI from '../abi/stockPool.json';
import ZapperABI from '../abi/zapper.json';
import LpABI from '../abi/lpToken.json';
import masterchefPLSXABI from '../abi/regularMasterchef.json';
import presaleABI from '../abi/presale.json';
export default {
  pcapToken: {
    address: '0xFixLater00000000000000000000000000000000',
    abi: IERC20ABI
  },
  masterChef: {
    address: '0xFixLater00000000000000000000000000000000',
    abi: masterchefABI
  },
  masterChefRh: {
    address: '0xFixLater00000000000000000000000000000000',
    abi: masterchefRhABI
  },
  stockToken: {
    address: '0xFixLater00000000000000000000000000000000',
    abi: StockTokenABI
  },
  stockPool: {
    address: '0xFixLater00000000000000000000000000000000',
    abi: StockPoolABI
  },
  zapper: {
    address: '0xFixLater00000000000000000000000000000000',
    abi: ZapperABI
  },
  pair: {
    address: '0xFixLater00000000000000000000000000000000',
    abi: LpABI
  },
  masterchefPLSX: {
    address: '0xB2Ca4A66d3e57a5a9A12043B6bAD28249fE302d4',
    abi: masterchefPLSXABI
  },
  presale: {
    address: '0xe2e7aE7D2539965CB006708FFC034a2c5d27340F',
    abi: presaleABI
  }
  
}
