/**
 *    Copyright 2015-2018 ppy Pty. Ltd.
 *
 *    This file is part of osu!web. osu!web is distributed with the hope of
 *    attracting more community contributions to the core ecosystem of osu!.
 *
 *    osu!web is free software: you can redistribute it and/or modify
 *    it under the terms of the Affero GNU General Public License version 3
 *    as published by the Free Software Foundation.
 *
 *    osu!web is distributed WITHOUT ANY WARRANTY; without even the implied
 *    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *    See the GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with osu!web.  If not, see <http://www.gnu.org/licenses/>.
 */

import UIStateStore from "../stores/ui-state-store";
import { observable } from "mobx";
import DispatchListener from "../dispatch-listener";
import DispatcherAction from "../actions/dispatcher-action";
import { ChatChannelSwitchAction } from "../actions/chat-actions";

export default class ChatStateStore implements DispatchListener {
  parent: UIStateStore

  @observable selected: number = -1;

  constructor(root: UIStateStore) {
    this.parent = root;
  }

  handleDispatchAction(action: DispatcherAction) {
    if (action instanceof ChatChannelSwitchAction) {
      this.selected = action.channel_id;
    }
  }
}
