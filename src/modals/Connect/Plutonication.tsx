// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faExternalLinkAlt, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useHelp } from 'contexts/Help';
import plutonicationImage from '../../img/plutonication_icon.png';
import { ButtonHelp } from 'kits/Buttons/ButtonHelp';
import { ButtonPrimaryInvert } from 'kits/Buttons/ButtonPrimaryInvert';
import { ModalHardwareItem } from 'kits/Overlay/structure/ModalHardwareItem';
import { ModalConnectItem } from 'kits/Overlay/structure/ModalConnectItem';
import {
  AccessCredentials,
  initializePlutonicationDAppClientWithModal,
} from '@plutonication/plutonication';
import { useExtensionAccounts } from '@w3ux/react-connect-kit/ExtensionAccountsProvider';

export const Plutonication = (): ReactElement => {
  const { t } = useTranslation('modals');
  const { connectExtensionAccounts } = useExtensionAccounts();
  const { openHelp } = useHelp();
  const url = 'plutonication.com';

  return (
    <ModalConnectItem>
      <ModalHardwareItem>
        <div className="body">
          <div className="status">
            <ButtonHelp onClick={() => openHelp('Polkadot Vault')} />
          </div>
          <div className="row">
            <img
              src={plutonicationImage}
              className="logo vault"
              alt="Plutonication"
            />
          </div>
          <div className="row margin">
            <h3>Plutonication</h3>
          </div>
          <div className="row margin">
            <ButtonPrimaryInvert
              text={t('connect')}
              onClick={async () => {
                const accessCredentials = new AccessCredentials(
                  'wss://plutonication-acnha.ondigitalocean.app/',
                  'Staking dashboard',
                  'https://rostislavlitovkin.pythonanywhere.com/plutowalleticonwhite'
                );

                await initializePlutonicationDAppClientWithModal(
                  accessCredentials,
                  (receivedPubkey: string) => {
                    /* */
                    console.log(receivedPubkey);
                  }
                );

                connectExtensionAccounts();
              }}
              iconLeft={faQrcode}
              iconTransform="shrink-1"
            />
          </div>
        </div>
        <div className="foot">
          <a
            className="link"
            href={`https://${url}`}
            target="_blank"
            rel="noreferrer"
          >
            {url}
            <FontAwesomeIcon icon={faExternalLinkAlt} transform="shrink-6" />
          </a>
        </div>
      </ModalHardwareItem>
    </ModalConnectItem>
  );
};
