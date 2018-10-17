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

import { spy, observable, autorun, ObservableMap, action} from "mobx";
import Channel from "./channel";
import User, { UserJSON } from "../user";

export interface MessageJSON {
  content: string;
  is_action: boolean;
  message_id: number;
  sender: UserJSON;
  sender_id: number;
  channel_id: number;
  timestamp: string;
}

export default class Message {
  @observable message_id: number;
  @observable uuid: string = osu.uuid();
  @observable channel: Channel;
  @observable sender: User;
  @observable content: string;
  @observable timestamp: string = moment().toISOString();
  @observable isAction: boolean = false;

  @observable persisted: boolean = false;
  @observable errored: boolean = false;

  constructor() {
    this.uuid = osu.uuid();
  }

  @action
  update(message: Message): Message {
    this.message_id = message.message_id;
    this.channel = message.channel;
    this.content = message.content;
    this.timestamp = message.timestamp;
    this.isAction = message.isAction;
    this.errored = message.errored;
    this.sender = message.sender;
    // this.data = JSON.stringify(message);

    return this;
  }

  @action
  persist(): Message {
    this.persisted = true;

    return this;
  }

  @action
  static fromJSON(json: MessageJSON): Message {
    let message = Object.create(Message.prototype);
    return (<any>Object).assign(message, {
      message_id: json.message_id,
      channel_id: json.channel_id,
      content: json.content,
      timestamp: json.timestamp,
      isAction: json.is_action,

      persisted: true,
    });
  }

  static reviver(key: string, value: any): any {
    return key === "" ? Message.fromJSON(value) : value;
  }
}
