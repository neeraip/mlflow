import { Version } from '../constants';
import { DarkThemeSwitch } from '@mlflow/mlflow/src/common/components/DarkThemeSwitch';
import { Button, MenuIcon, useDesignSystemTheme } from '@databricks/design-system';

import { ReactComponent as CheckCircleIcon } from '../../common/static/check_circle.svg';
import { ReactComponent as CopyIcon } from '../../common/static/copy.svg';
import { copyTextToClipboard } from '../../common/utils/copyTextToClipboard';
import { useEffect, useState } from 'react';

export const MlflowHeader = ({
  isDarkTheme = false,
  setIsDarkTheme = (val: boolean) => {},
  sidebarOpen,
  toggleSidebar,
}: {
  isDarkTheme?: boolean;
  setIsDarkTheme?: (isDarkTheme: boolean) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const { theme } = useDesignSystemTheme();

  const [copied, setCopied] = useState(false);

  const studioUrl = process.env['REACT_APP_STUDIO_URL'];

  useEffect(() => {
    if (studioUrl && copied) {
      copyTextToClipboard(studioUrl);
      setTimeout(() => setCopied(false), 1000);
    }
  }, [copied, setCopied]);

  return (
    <header
      css={{
        backgroundColor: theme.colors.backgroundSecondary,
        color: theme.colors.textSecondary,
        display: 'flex',
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.md,
        paddingTop: theme.spacing.sm + theme.spacing.xs,
        paddingBottom: theme.spacing.xs,
        a: {
          color: theme.colors.textSecondary,
        },
        alignItems: 'center',
      }}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          type="tertiary"
          componentId="mlflow_header.toggle_sidebar_button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          aria-pressed={sidebarOpen}
          icon={<MenuIcon />}
        />
        <div style={{ marginLeft: '8px', marginRight: '8px' }}></div>
        <span
          css={{
            fontSize: theme.typography.fontSizeSm,
          }}
        >
          AI Studio v{Version}
        </span>
      </div>
      <div css={{ flex: 1 }} />
      <div css={{ display: 'flex', gap: theme.spacing.lg, alignItems: 'center' }}>
        <DarkThemeSwitch isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        {process.env['REACT_APP_STUDIO_URL'] && (
          <div css={{ display: 'flex', flexDirection: 'row', gap: theme.spacing.xs, alignItems: 'center' }}>
            <Button
              componentId="neer.studio.url"
              size="small"
              icon={
                copied ? (
                  <CheckCircleIcon width="14px" height="14px" css={{ marginLeft: '4px' }} />
                ) : (
                  <CopyIcon width="14px" height="14px" css={{ marginLeft: '4px' }} />
                )
              }
              css={{ flexDirection: 'row-reverse' }}
              onClick={() => setCopied(true)}
            >
              Copy Tracking URL
            </Button>
          </div>
        )}
        {/* <a href="https://github.com/neeraip/mlflow">GitHub</a>
        <a href={HomePageDocsUrl}>Docs</a> */}
      </div>
    </header>
  );
};
