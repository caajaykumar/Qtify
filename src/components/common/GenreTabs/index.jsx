import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export default function GenreTabs({ genres = [], value = 'all', onChange = () => {} }) {
  // Create an array with 'All' tab + dynamic genres
  const tabs = [{ key: 'all', label: 'All' }, ...genres.map((g) => ({ key: g.key || g.label || g, label: g.label || g.name || g.key || String(g) }))]

  return (
    <Tabs
      value={value}
      onChange={(e, v) => onChange(v)}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      sx={{
        minHeight: 40,
        '& .MuiTabs-scroller': { padding: '4px 0' },
        '& .MuiTab-root': {
          minHeight: 32,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 14,
          color: 'rgba(255,255,255,0.7)',
          mr: 1,
          px: 2.25,
          borderRadius: 9999,
          '&.Mui-selected': {
            color: '#000',
            backgroundColor: '#34C94B',
          },
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.08)'
          }
        },
        '& .MuiTabs-indicator': { display: 'none' },
      }}
    >
      {tabs.map((t) => (
        <Tab key={t.key} label={t.label} value={t.key} />
      ))}
    </Tabs>
  )
}
