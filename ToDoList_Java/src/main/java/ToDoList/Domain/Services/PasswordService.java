package ToDoList.Domain.Services;

import ToDoList.Application.Services.Interfaces.User.IPasswordService;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.*;

@Service
public class PasswordService implements IPasswordService {

    private String GetHashFromString(String str) {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        for(byte b: salt){
            b = 1;
        }

        KeySpec spec = new PBEKeySpec(str.toCharArray(), salt, 65536, 128);

        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            byte[] hash = factory.generateSecret(spec).getEncoded();
            return Base64.getEncoder().encodeToString(hash);

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }


    }

    public String CreateHashFromPassword(String password){
        String passwordHash = GetHashFromString(password);
        return passwordHash;
    }

    public Boolean IsPasswordEqualToHash(String password, String hash){
        String passwordHash = GetHashFromString(password);
        return Objects.equals(passwordHash, hash);
    }

}
