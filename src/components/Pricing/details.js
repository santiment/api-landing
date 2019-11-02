export default {
  columns: ['', 'free', 'basic', 'pro', 'premium', 'corporate'],
  rows: [
    {
      group: { name: 'Financial data', slug: 'financial'},
      data: [
        { name: 'Open/High/Low/Close', slug: 'open' },
        { name: 'Price-volume difference indicator', slug: 'price'},
      ],
    },
    {
      group: {name: 'On-chain data', slug: 'onchain'},
      data: [
        { name: 'Open/High/Low/Close', slug: 'open' },
        { name: 'Network growth', slug: 'networkgrowth'},
        { name: 'Token age consumed', slug: 'tokenage' },
        { name: 'Average token age consumed', slug: 'averagetokenage' },
        { name: 'Exchange flow', slug: 'exchangeflow' },
        { name: 'Total ERC20 exchange funds flow', slug: 'exchangefunds' },
        { name: 'Transaction volume', slug: 'transactionvolume' },
        { name: 'Total circulation (beta)', slug: 'totalcirculation' },
        { name: 'Velocity of tokens (beta)', slug: 'velocity' },
        { name: 'ETH gas used', slug: 'ethgasused' },
        { name: 'Distribution between mining pools', slug: 'distribution' },
        { name: 'Top holders percent of total supply', slug: 'topholders' },
        { name: 'Percent of total supply on exchanges', slug: 'totalsupply' },
        { name: 'Realized value', checks: [false, false, true, true, true], slug: 'realizedvalue' },
        { name: 'MVRV ratio', checks: [false, false, true, true, true], slug: 'mvrv' },
        { name: 'NVT', checks: [false, false, true, true, true], slug: 'nvt' },
        {name: 'Daily active deposits', slug: 'dailyactivedeposits', checks: [false, false, true, true, true]},
      ],
    },
    {
      group: {name: 'Social data', slug: 'socialdata'},
      data: [
        { name: 'Dev activity', slug: 'devactivity' },
        { name: 'Topic search', slug: 'topicsearch' },
        { name: 'Relative social dominance', slug: 'socialdominance' },
        { name: 'Total social volume', slug: 'totalsocialvolume' },
      ],
    },
  ],
}
