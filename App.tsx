import { useState } from 'react';
import {
  Host,
  AlertDialog,
  Button,
  TextButton,
  Text,
} from '@expo/ui/jetpack-compose';

export default function BasicAlertDialogExample() {
  const [visible, setVisible] = useState(false);

  return (
    <Host matchContents>
      <Button onClick={() => setVisible(true)}>
        <Text>Show alert</Text>
      </Button>
      {visible && (
        <AlertDialog onDismissRequest={() => setVisible(false)}>
          <AlertDialog.Title>
            <Text>Confirm action</Text>
          </AlertDialog.Title>
          <AlertDialog.Text>
            <Text>Are you sure you want to proceed?</Text>
          </AlertDialog.Text>
          <AlertDialog.ConfirmButton>
            <TextButton onClick={() => setVisible(false)}>
              <Text>Confirm</Text>
            </TextButton>
          </AlertDialog.ConfirmButton>
          <AlertDialog.DismissButton>
            <TextButton onClick={() => setVisible(false)}>
              <Text>Cancel</Text>
            </TextButton>
          </AlertDialog.DismissButton>
        </AlertDialog>
      )}
    </Host>
  );
}
