framework : Next.js
套件 : Chakra UI, react-intersection-observer

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## FILES 說明
- for knsh
- /src/app/components/cardsgrid/cardstyle => 卡片樣式
- /src/app/components/cardsgrid/index => 手機卡片列表入口
- /src/app/components/cardsgrid/infiniteCards => 卡片 infinite 模式
- /src/app/components/cardsgrid/virtualCards => 卡片 virtual 模式
- /src/app/view/index_knsh => knsh 切換 table or mobile 樣式入口
- /src/app/knsh/page => knsh 入口

- for newretail
- /src/app/components/cardsList/cardstyle => 卡片樣式
- /src/app/components/cardsList/index => 手機卡片列表入口
- /src/app/components/cardsList/infiniteCards => 卡片 infinite 模式 列表
- /src/app/components/cardsList/virtualCards => 卡片 virtual 模式 列表
- /src/app/view/index_newretail => newretail 切換 table or mobile 樣式入口
- /src/app/newretail/page => newretail 入口

- /src/app/components/filter => 篩選功能
- /src/app/components/header => header + 手機樣式 or 桌機樣式
- /src/app/components/inputDebounce => input防抖
- /src/app/components/tableList => Table樣式列表
- /src/app/context/device => 全域資料, 設定 table or mobile樣式
- /src/app/context/filter => 全域資料, 設定 過瀘資料
- /src/app/providers/chakra => chakra provider


## 功能說明
- 篩選 : 類別, 關鍵字搜尋, 價格範圍, 庫存
- 排序 : 價格升序、降序 or 不排序
- 效能 : table 使用 Pagination, mobile 使用 Virtual Scroll
- 響應式 : table => 商品以表格形式顯示，每行顯示一個商品,  mobile => 商品以卡片形式顯示，每行顯示最多兩個商品
- 優化 : 篩選功能 使用 input防抖

## Deploy on Vercel

已部屬上 Vercel
[ HW NEWRETAIL ](https://hw-newretail.vercel.app/newretail)
[ HW KNSH ](https://hw-newretail.vercel.app/knsh)
