###
#    Copyright 2015-2017 ppy Pty. Ltd.
#
#    This file is part of osu!web. osu!web is distributed with the hope of
#    attracting more community contributions to the core ecosystem of osu!.
#
#    osu!web is free software: you can redistribute it and/or modify
#    it under the terms of the Affero GNU General Public License version 3
#    as published by the Free Software Foundation.
#
#    osu!web is distributed WITHOUT ANY WARRANTY; without even the implied
#    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
#    See the GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with osu!web.  If not, see <http://www.gnu.org/licenses/>.
###

{div, h2, h3} = ReactDOMFactories
el = React.createElement

class ProfilePage.Medals extends React.PureComponent
  render: =>
    @userAchievements = null

    all =
        for own grouping, groupedAchievements of @groupedAchievements()
          div
            key: grouping
            className: 'medals-group__group'
            h3 className: 'medals-group__title', grouping
            for own ordering, achievements of @orderedAchievements(groupedAchievements)
                div
                  key: ordering
                  className: 'medals-group__medals'
                  achievements.map @medal

    div
      className: 'page-extra'
      el ProfilePage.ExtraHeader, name: @props.name, withEdit: @props.withEdit

      div null,
        for achievement in @props.userAchievements[0..7]
          el ProfilePage.AchievementBadge,
            key: achievement.achievement_id
            additionalClasses: 'badge-achievement--listing'
            achievement: @props.achievements[achievement.achievement_id]
            userAchievement: achievement

      div className: 'medals-group',
        all
      if all.length == 0
        osu.trans('users.show.extra.medals.empty')


  groupedAchievements: =>
    isCurrentUser = currentUser.id == @props.user.id

    _.chain(@props.achievements)
      .values()
      .filter (a) =>
        isCurrentMode = !a.mode? || a.mode == @props.currentMode
        isAchieved = @userAchievement a.id

        isCurrentMode && (isAchieved || isCurrentUser)
      .groupBy (a) =>
        a.grouping
      .value()


  medal: (achievement) =>
    div
      key: achievement.id
      className: 'medals-group__medal'
      el ProfilePage.AchievementBadge,
        additionalClasses: 'badge-achievement--listing'
        achievement: achievement
        userAchievement: @userAchievement achievement.id


  orderedAchievements: (achievements) =>
    _.groupBy achievements, (achievement) =>
      achievement.ordering


  userAchievement: (id) =>
    @userAchievements ?= _.keyBy @props.userAchievements, 'achievement_id'

    @userAchievements[id]
