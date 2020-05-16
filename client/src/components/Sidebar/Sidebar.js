import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash' 

import { Drawer, IconButton, List } from '@material-ui/core'
import {
  Home as HomeIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons'
import { useTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

import SidebarLink from './components/SidebarLink/SidebarLink'

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../context/LayoutContext'

import useStyles from './styles'

const structure = [
  { id: 0, label: 'Dashboard', link: '/app/dashboard', icon: <HomeIcon /> },
  {
    id: 1,
    label: 'Typography',
    link: '/app/typography',
    icon: <TypographyIcon />,
  },
  { id: 2, label: 'Tables', link: '/app/tables', icon: <TableIcon /> },
  {
    id: 4,
    label: 'UI Elements',
    link: '/app/ui',
    icon: <UIElementsIcon />,
    children: [{ label: 'Charts', link: '/app/ui/charts' }],
  },
  { id: 5, type: 'divider' },
]

const Sidebar = ({ location }) => {
  const classes = useStyles()
  const theme = useTheme()

  const { isSidebarOpened } = useLayoutState()
  const layoutDispatch = useLayoutDispatch()

  const [isPermanent, setPermanent] = useState(true)

  const handleWindowWidthChange = () => {
    var windowWidth = window.innerWidth
    var breakpointWidth = theme.breakpoints.values.md
    var isSmallScreen = windowWidth < breakpointWidth

    if (isSmallScreen && isPermanent) {
      setPermanent(false)
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowWidthChange)
    handleWindowWidthChange()
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange)
    }
  })

  const listShops = useSelector((state) => _.get(state, 'shop.list'))

  _.map(listShops, (shop) => {
    if(!_.size(_.find(structure, (item) => item.id === shop.id))) {
      structure.push({
        id: shop.id,
        label: shop.name,
        link: `/app/shop/${shop.id}`,
      })
    }
  })



  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  )
}

export default withRouter(Sidebar)
